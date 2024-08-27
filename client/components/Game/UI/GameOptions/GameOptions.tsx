import styles from "./GameOptions.module.css";
import {GAME_SETTINGS_MODE, GameSettings} from "../../../Lobby/GameSettings/GameSettings";
import sharedStyles from "../../../../styles/shared.module.css";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {socketEmit} from "../../../../middleware/socketMiddleware";
import {SOCKET_EVENT_CLIENT} from "@shared/types/Requests/Socket";

interface Props {

}

export function GameOptions(props: Props) {

    const dispatch = useAppDispatch();
    const sessionId = useAppSelector(state => state.gameSession.sessionId);

    function handleSaveClick() {
        dispatch(socketEmit(SOCKET_EVENT_CLIENT.SAVE_GAME, {sessionId}))
        console.log("dispatching")
    }

    return <div className={styles.container}>
        <div className={styles.gameSettings}>
            <GameSettings mode={GAME_SETTINGS_MODE.LOCKED} host={false}/>
        </div>
        <hr className={sharedStyles.hr}/>
        <div className={`menuButton ${styles.button}`} onClick={handleSaveClick}>
            Zapisz grę
        </div>
    </div>
}
