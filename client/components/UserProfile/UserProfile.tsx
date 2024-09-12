import styles from "./UserProfile.module.css";

import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteAuthCookie } from "../../utils/auth/deleteAuthCookie";
import { connectedUpdated, userUpdated } from "../../reduxSlices/connection";
import { useEffect, useState } from "react";
import { SessionBasicInfo } from "@shared/types/Session/Session";
import { socket } from "../../store/store";
import { UserAvatar } from "./UserAvatar/UserAvatar";
import { useTranslation } from "react-i18next";
import capitalize from "@shared/utils/capitalize";
import { Session } from "../SessionList/Session/Session";
import { SOCKET_EVENT_CLIENT, SOCKET_EVENT_SERVER } from "@shared/types/Requests/Socket";
import { socketEmit } from "../../middleware/socketMiddleware";
import { setSocketListener } from "../../pages/api/socket";

interface Props {}

export function UserProfile(props: Props) {
	const router = useRouter();
	const user = useAppSelector((state) => state.connection.user);
	const dispatch = useAppDispatch();
	const [sessionsInProgress, setSessionsInProgress] = useState<
		SessionBasicInfo[] | null
	>(null);
	const [avatarUrl, setAvatarUrl] = useState<string>("");
	const { t } = useTranslation();

	function handleSignOut() {
		deleteAuthCookie();
		dispatch(userUpdated(null));
		dispatch(connectedUpdated(false));
		socket.disconnect();
		router.push("/signIn").catch((e) => console.error(e));
	}

	if (!sessionsInProgress) {
		requestGameList();
	}

	useEffect(() => {
        const listeners = [
            setSocketListener(SOCKET_EVENT_SERVER.GAME_IN_PROGRESS_LIST_SENT, (payload) => {
                setSessionsInProgress(payload.sessionList);
            }),
			setSocketListener(SOCKET_EVENT_SERVER.JOIN_SESSION_RESPONSE, (payload) => {
				router.push("/play/" + payload.sessionId);
			}),
			setSocketListener(SOCKET_EVENT_SERVER.GAME_IN_PROGRESS_LIST_CHANGED, (payload) => {
				requestGameList();
			})
        ]
		
		requestGameList();
		return () => {
		    listeners.forEach(listener => listener.off())
		}
	}, []);

	function requestGameList() {
		dispatch(socketEmit(SOCKET_EVENT_CLIENT.SEND_GAME_IN_PROGRESS_LIST, null))
	}

	function handleJoinGameClick(sessionId: string) {
		dispatch(socketEmit(SOCKET_EVENT_CLIENT.JOIN_SESSION, {
			sessionId,
		}))
	}

	return (
		<div className={styles.container}>
			{user && (
				<div className={styles.avatar}>
					<UserAvatar username={user.username} />
				</div>
			)}
			<h2>{user?.username}</h2>
			<hr />
			{sessionsInProgress && sessionsInProgress.length > 0 && (
				<>
					<div className={styles.gamesInProgress}>
						<h5 className={styles.gameInProgressTitle}>
							Zaczęte gry
						</h5>
						{sessionsInProgress.map((session) => {
							return (
								<div>
									<Session
										name={session.name}
										host={session.host}
										playerAmount={session.usersInSession}
										maxPlayerAmount={session.players}
										scenario={session.scenario}
										password={session.password}
										id={session.id}
										onPasswordJoinAttempt={handleJoinGameClick}
										onJoinClick={handleJoinGameClick}
										hidePassword={true}
                                        shortMode={true}
									/>
								</div>
							);
						})}
					</div>
					<hr />
				</>
			)}

			<span className={styles.signOutLink} onClick={handleSignOut}>
				{capitalize(t("menu.sign out"))}
			</span>
		</div>
	);
}
