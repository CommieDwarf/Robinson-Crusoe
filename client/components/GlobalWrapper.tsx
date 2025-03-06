import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ReactNode, useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth/isAuthenticated";
import { getAuthToken } from "../utils/auth/getAuthToken";
import { fetchAndUpdateUser } from "../lib/fetchAndUpdateUser";
import { socketConnect } from "../middleware/socketMiddleware";
import { setSocketListener } from "../pages/api/socket";
import { SOCKET_EVENT_SERVER } from "@shared/types/Requests/Socket";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { NetworkReconnectHandler } from "./NetworkReconnectHandler/NetworkReconnectHandler";

interface Props {
	children: ReactNode;
}

export function GlobalWrapper(props: Props) {
	const user = useAppSelector((state) => state.connection.user);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const [reconnecting, setReconnecting] = useState(false);

	const connectionLost = useAppSelector(
		(state) => state.connection.socketConnectionLost
	);
	useEffect(() => {
		if (connectionLost && isAuthenticated()) {
			setReconnecting(true);
		} else {
			setReconnecting(false);
		}
	}, [connectionLost]);

	useEffect(() => {
		async function handleStorage(event: StorageEvent) {
			if (event.key === "emailVerified" && event.newValue !== null) {
				const token = getAuthToken();
				if (token) {
					await fetchAndUpdateUser(token, dispatch);
				}
				localStorage.removeItem("emailVerified");
			}
		}
		window.addEventListener("storage", handleStorage);


		return () => {
			window.removeEventListener("storage", handleStorage);
		};
	}, [dispatch]);

	useEffect(() => {
		const authenticated = isAuthenticated();
		if (authenticated && !user) {
			const token = getAuthToken() as string;
			fetchAndUpdateUser(token, dispatch);
		}
	}, [user, dispatch]);

	useEffect(() => {
		if (user) {
			const token = getAuthToken();
			if (token && user.emailVerified) {
				dispatch(socketConnect({ authToken: token }));
			}
		}
	}, [dispatch, user]);

	useEffect(() => {
		const listener = setSocketListener(
			SOCKET_EVENT_SERVER.ALERT_SENT,
			(payload) => {
				//@ts-ignore
				toast(t("alerts." + payload.code), {
					type: "warning",
				});
			}
		);

		return () => {
			listener.off();
		};
	}, []);

	useEffect(() => {
		if (!user && isAuthenticated()) {
			const token = getAuthToken();
			if (!token) {
				return;
			}

			fetchAndUpdateUser(token, dispatch);
		}
	}, []);

	return (
		<>
			{props.children}
			{reconnecting && (
				<>
					<NetworkReconnectHandler />
				</>
			)}
		</>
	);
}
