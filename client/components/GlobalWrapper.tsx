import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ReactNode, useEffect } from "react";
import { isAuthenticated } from "../utils/auth/isAuthenticated";
import { getAuthToken } from "../utils/auth/getAuthToken";
import { fetchUser } from "../lib/fetchUser";
import { userUpdated } from "../reduxSlices/connection";
import { socketConnect } from "../middleware/socketMiddleware";
import { setSocketListener } from "../pages/api/socket";
import { SOCKET_EVENT_SERVER } from "@shared/types/Requests/Socket";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface Props {
	children: ReactNode;
}

export function GlobalWrapper(props: Props) {
	const user = useAppSelector((state) => state.connection.user);
	const dispatch = useAppDispatch();
	const {t} = useTranslation();

	useEffect(() => {
		function handleStorage(event: StorageEvent) {
			if (event.key === "emailVerified" && event.newValue !== null) {
				const token = getAuthToken();
				if (token) {
					console.log("fetching user");
					fetchUser(token).then((user) => {
						dispatch(userUpdated(user));
					});
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
		console.log("use Effect");
		console.log("authenticated", authenticated);
		console.log("user", user);
		if (authenticated && !user) {
			const token = getAuthToken() as string;
			fetchUser(token).then((response) => {
				dispatch(userUpdated(response));
			});
		}
	}, [user, dispatch]);

	useEffect(() => {
		if (user) {
			console.log("use Effect");
			const token = getAuthToken();
			console.log("auth token", token);
			console.log("user", user);
			if (token && user.emailVerified) {
				console.log("dispatching socketConnect");
				dispatch(socketConnect({ authToken: token }));
			}
		}
	}, [dispatch, user]);

	useEffect(() => {
		console.log("setting a listener");
		 const listener = setSocketListener(SOCKET_EVENT_SERVER.ALERT_SENT, (payload) => {
			//@ts-ignore
			toast(t("alerts." + payload.code), {
				type: "warning"
			})
		 })

		 return () => {
			listener.off();
		 }
	}, [])



	return <>{props.children}</>;
}
