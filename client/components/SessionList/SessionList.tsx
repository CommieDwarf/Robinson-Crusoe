import styles from "./SessionList.module.css";
import { Session } from "./Session/Session";
import { Header } from "./Header/Header";
import { useEffect, useState } from "react";
import {
	SOCKET_EVENT_CLIENT,
	SOCKET_EVENT_SERVER,
} from "@shared/types/Requests/Socket";
import { SessionBasicInfo } from "@shared/types/Session/Session";
import { useAppDispatch } from "../../store/hooks";
import { socketEmit } from "../../middleware/socketMiddleware";
import { setSocketListener } from "../../pages/api/socket";
import { LoadingSpinner } from "../LoaderSpinner/LoaderSpinner";

interface Props {
	setSessionIdToEnter: (sessionId: string) => void;
	showSpinner: boolean;
	updateShowSpinner: (value: boolean) => void;
}

export function SessionList(props: Props) {
	const [sessionList, setSessionList] = useState<SessionBasicInfo[]>([]);
	const dispatch = useAppDispatch();

	function requestList() {
		dispatch(socketEmit(SOCKET_EVENT_CLIENT.SEND_SESSION_LIST, null));
		props.updateShowSpinner(true);
	}

	function joinSession(sessionId: string, password = "") {
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.JOIN_SESSION, {
				sessionId,
				password,
			})
		);
	}

	useEffect(() => {
		const listeners = [
			setSocketListener(SOCKET_EVENT_SERVER.SESSION_LIST_CHANGED, () => {
				requestList();
			}),
			setSocketListener(
				SOCKET_EVENT_SERVER.SESSION_LIST_SENT,
				(payload) => {
					setSessionList(payload.sessionList);
					props.updateShowSpinner(false);
				}
			),
		];
		requestList();
		return () => {
			listeners.forEach((listener) => listener.off());
		};
	}, []);

	return (
		<div className={styles.container}>
			<Header />
			{props.showSpinner ? (
				<div className={styles.loaderSpinnerWrapper}>
					<LoadingSpinner />
				</div>
			) : (
				<div className={styles.sessionList}>
					{sessionList.map((session, i) => {
						return (
							<Session
								name={session.name}
								host={session.host}
								playerAmount={session.players}
								maxPlayerAmount={session.maxPlayers}
								scenario={session.scenario}
								password={session.password}
								id={session.id}
								key={i}
								onPasswordJoinAttempt={
									props.setSessionIdToEnter
								}
								onJoinClick={joinSession}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
