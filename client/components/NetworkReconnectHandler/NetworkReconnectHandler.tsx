import { useEffect, useState } from "react";
import { LoaderSpinner } from "../LoaderSpinner/LoaderSpinner";
import styles from "./NetworkReconnectHandler.module.css";
import { useAppDispatch } from "../../store/hooks";
import { getAuthToken } from "../../utils/auth/getAuthToken";
import { isAuthenticated } from "../../utils/auth/isAuthenticated";
import { socketConnect } from "../../middleware/socketMiddleware";
import { useTranslation } from "react-i18next";
import { DarkOverlay } from "components/DarkOverlay/DarkOverlay";

export function NetworkReconnectHandler() {
	const reconnectFrequencySeconds = 5;
	const [secondsToReconnect, setSecondsToReconnect] = useState(
		reconnectFrequencySeconds
	);

	const dispatch = useAppDispatch();

	const { t } = useTranslation();

	useEffect(() => {
		const authToken = getAuthToken();
		const isAuth = isAuthenticated();
		if (!authToken || !isAuth) {
			throw new Error(
				"This component shouldn't be alive without authentication"
			);
		}

		const interval = setInterval(() => {
			setSecondsToReconnect((prev) => {
				if (prev <= 0) {
					return reconnectFrequencySeconds;
				} else {
					return prev - 1;
				}
			});
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		const authToken = getAuthToken();
		if (!authToken) {
			throw new Error(
				"This component shouldn't by alive without authToken"
			);
		}
		if (secondsToReconnect <= 0) {
			dispatch(socketConnect({ authToken }));
		}
	}, [secondsToReconnect]);

	return (
		<div className={styles.container}>
			<DarkOverlay blockPointerEvents={true} />
			<div className={styles.window}>
				<span className={styles.connectionLostInfo}>
					Brak połączenia z serwerem.
				</span>
				<br />
				<span className={styles.reconnectInfo}>
					{t("menu.another connection attempt in", {
						seconds: secondsToReconnect,
					})}
				</span>
				<div className={styles.loaderSpinner}>
					<LoaderSpinner />
				</div>
			</div>
		</div>
	);
}
