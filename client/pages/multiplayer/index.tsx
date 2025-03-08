import styles from "./index.module.css";
import { SessionList } from "../../components/SessionList/SessionList";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	SOCKET_EVENT_CLIENT,
	SOCKET_EVENT_SERVER,
} from "@shared/types/Requests/Socket";
import { useRouter } from "next/router";
import { Message } from "../../components/Modals/Message/Message";
import { BackButton } from "../../components/BackButton/BackButton";
import { useAppDispatch } from "../../store/hooks";
import { socketEmit } from "../../middleware/socketMiddleware";
import { setSocketListener } from "../api/socket";
import { SaveList } from "../../components/SaveList/SaveList";
import { DraggableWindow } from "../../components/Game/UI/DraggableWindow/DraggableWindow";
import { sharedConfig } from "@shared/config/sharedConfig";

export function Multiplayer() {
	const { t } = useTranslation();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [sessionIdToJoin, setSessionIdToJoin] = useState("");
	const [joinCode, setJoinCode] = useState("");
	const [showSpinner, setShowSpinner] = useState(true);
	const [message, setMessage] = useState(router.query.msg as string);

	const [showSaveList, setShowSaveList] = useState(false);

	function setSessionIdToEnter(sessionId: string) {
		setSessionIdToJoin(sessionId);
	}

	function closeWindow() {
		setSessionIdToJoin("");
		setMessage("");
	}

	function handleRefreshClick() {
		setShowSpinner(true);
		dispatch(socketEmit(SOCKET_EVENT_CLIENT.SEND_SESSION_LIST, null));
	}

	function handleLoadClick() {
		setShowSaveList((prev) => !prev);
	}

	function handleJoinByCodeClick() {
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.JOIN_SESSION_BY_CODE, {
				code: joinCode,
				password: "",
			})
		);
	}

	function handleJoinCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
		setJoinCode(event.currentTarget.value);
	}

	function updateShowSpinner(value: boolean) {
		setShowSpinner(value);
	}

	useEffect(() => {
		const listeners = [
			setSocketListener(
				SOCKET_EVENT_SERVER.JOIN_SESSION_RESPONSE,
				(payload) => {
					if (payload.error) {
						setMessage(payload.error);
						return;
					}
					if (payload.sessionId) {
						router
							.push(`/multiplayer/lobby/${payload.sessionId}`)
							.then();
					}
				}
			),
			setSocketListener(
				SOCKET_EVENT_SERVER.SESSION_CONNECTION_STATUS_SENT,
				(payload) => {
					if (payload.error) {
						setMessage(payload.error);
						setSessionIdToJoin("");
					}
				}
			),
		];

		return () => {
			listeners.forEach((listener) => listener.off());
		};
	}, [router]);

	useEffect(() => {
		dispatch(socketEmit(SOCKET_EVENT_CLIENT.SEND_SAVE_LIST, {}));
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<div className={styles.panel}>
				<div className={styles.buttons}>
					<div className={styles.backButton}>
						<BackButton />
					</div>
					<div
						className={`menuButton ${styles.button}`}
						onClick={handleRefreshClick}
					>
						{capitalize(t("menu.refresh"))}
					</div>
					<Link
						href={"./multiplayer/create-game"}
						className={`menuButton ${styles.button}`}
					>
						<div>{capitalize(t("menu.create game"))}</div>
					</Link>
					<div
						className={`menuButton ${styles.button}`}
						onClick={handleLoadClick}
					>
						{capitalize(t("menu.load game"))}
					</div>
				</div>
				<div className={styles.joinByCodeWrapper}>
					<div className={`${styles.joinByCodeText} nonSelectable`}>
						{capitalize(t("menu.join with game code"))}
					</div>
					<div className={styles.joinByCodeInputDiv}>
						<input
							type={"text"}
							maxLength={
								sharedConfig.session.invitationCodeLength
							}
							value={joinCode}
							onChange={handleJoinCodeChange}
						></input>
					</div>
					<div
						className={"menuButton"}
						onClick={handleJoinByCodeClick}
					>
						{capitalize(t("menu.join"))}
					</div>
				</div>
			</div>
			<SessionList
				setSessionIdToEnter={setSessionIdToEnter}
				showSpinner={showSpinner}
				updateShowSpinner={updateShowSpinner}
			/>
			{sessionIdToJoin && (
				<DraggableWindow
					onClose={closeWindow}
					styles={{ aspectRatio: "2", height: "18vh" }}
				>
					{/* <EnterPassword
						sessionId={sessionIdToJoin}
						setSessionIdToEnter={setSessionIdToEnter}
					/> */}
				</DraggableWindow>
			)}
			{message && (
				<DraggableWindow
					onClose={closeWindow}
					styles={{
						aspectRatio: "2",
						height: "20vh",
						padding: "1%",
						backgroundSize: "200%",
					}}
				>
					<Message
					// @ts-expect-error
						message={t(`error.${message}`)}
						title={t(`error.disconnected`)}
					/>
				</DraggableWindow>
			)}

			{showSaveList && (
				<DraggableWindow
					padding={"5px 10px 5px 10px"}
					onClose={handleLoadClick}
				>
					<SaveList />
				</DraggableWindow>
			)}
		</div>
	);
}

export default Multiplayer;
