import { UserData } from "@shared/types/UserData/UserData";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import styles from "../UserProfile.module.css";
import { deleteAuthCookie } from "utils/auth/deleteAuthCookie";
import { connectedUpdated, userUpdated } from "reduxSlices/connection";
import { socket } from "store/store";
import { useRouter } from "next/router";
import { capitalize } from "lodash";
import { useTranslation } from "react-i18next";
import { socketEmit } from "middleware/socketMiddleware";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import { PROFILE_NAV, ProfileComponentProps } from "../UserProfile";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store/hooks";
import { LoadingSpinner } from "components/LoaderSpinner/LoaderSpinner";

export function ProfileHome(props: ProfileComponentProps) {
	const router = useRouter();

	const { t } = useTranslation();

	const dispatch = useDispatch();

	function handleSignOut() {
		deleteAuthCookie();
		dispatch(userUpdated(null));
		dispatch(connectedUpdated(false));
		socket.disconnect();
		router.push("/sign-in");
	}

	function handleJoinGameClick(sessionId: string) {
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.JOIN_SESSION, {
				sessionId,
				password: "",
			})
		);
	}

	function handdleSettingsClick() {
		if (props.user?.emailVerified) {
			props.changeNav(PROFILE_NAV.SETTINGS);
		}
	}

	return (
		<>
			{props.user ? (
				<>
					<div className={styles.avatar}>
						{
							<UserAvatar
								username={props.user?.username || "empty"}
							/>
						}
					</div>
					<h2 className={styles.username}>{props.user?.username}</h2>
					<p
						className={`${styles.link} ${styles.accountSettings} ${
							!props.user?.emailVerified && styles.linkLocked
						}`}
						onClick={handdleSettingsClick}
					>
						{t("userProfile.accountSettings")}
					</p>{" "}
				</>
			) : (
				<div className={styles.spinner}>
					<LoadingSpinner />
				</div>
			)}

			<hr />

			{/* {sessionsInProgress && sessionsInProgress.length > 0 && (
				<>
					<div className={styles.gamesInProgress}>
						<h5 className={styles.gameInProgressTitle}>
							Zaczęte gry
						</h5>
						{sessionsInProgress.map((session, i) => {
							return (
								<div key={i}>
									<Session
										name={session.name}
										host={session.host}
										playerAmount={session.usersInSession}
										maxPlayerAmount={session.players}
										scenario={session.scenario}
										password={session.password}
										id={session.id}
										onPasswordJoinAttempt={
											handleJoinGameClick
										}
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
			)} */}

			<p className={styles.link} onClick={handleSignOut}>
				{capitalize(t("menu.sign out"))}
			</p>
		</>
	);
}
