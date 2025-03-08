import styles from "./GameOptions.module.css";
import {
	GAME_SETTINGS_MODE,
	GameSettings,
} from "../../../Lobby/GameSettings/GameSettings";
import sharedStyles from "../../../../styles/shared.module.css";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { socketEmit } from "../../../../middleware/socketMiddleware";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";


export function GameOptions() {
	const dispatch = useAppDispatch();
	const sessionId = useAppSelector((state) => state.gameSession.sessionId);

	function handleSaveClick() {
		dispatch(socketEmit(SOCKET_EVENT_CLIENT.SAVE_GAME, { sessionId }));
	}

	function handleRestartClick() {
		dispatch(socketEmit(SOCKET_EVENT_CLIENT.RESTART_GAME, { sessionId }));
	}

	function handleTerminateClick() {
		dispatch(socketEmit(SOCKET_EVENT_CLIENT.TERMINATE_GAME, { sessionId }));
	}

	const isHost = useAppSelector(
		(state) =>
			state.gameSession.data?.hostPlayer.id ===
			state.gameSession.data?.localPlayer.id
	);

	return (
		<div className={styles.container}>
			<div className={styles.gameSettings}>
				<GameSettings mode={GAME_SETTINGS_MODE.LOCKED} host={false} />
			</div>
			<hr className={sharedStyles.hr} />
			<div className={styles.buttons}>
				<div
					className={`menuButton ${styles.button} ${
						!isHost && "menuButtonDisabled"
					}`}
					onClick={handleSaveClick}
				>
					Zapisz grę
				</div>
				<div
					className={`menuButton ${styles.button} ${
						!isHost && "menuButtonDisabled"
					}`}
					onClick={handleRestartClick}
				>
					Restartuj
				</div>
				<div
					className={`menuButton ${styles.button} ${
						!isHost && "menuButtonDisabled"
					}`}
					onClick={handleTerminateClick}
				>
					Zakończ grę
				</div>
			</div>
		</div>
	);
}
