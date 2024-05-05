import styles from "./index.module.css";
import {GameSettings} from "../../../components/Lobby/GameSettings/GameSettings";
import {Players} from "../../../components/Lobby/Players/Players";
import {Character} from "../../../components/Lobby/Character/Character";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {socket, socketEmitter} from "../../_app";
import {SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {actionSlotUpdated, gameSessionUpdated} from "../../../reduxSlices/gameSession";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";

export function Lobby() {
    const [gender, setGender] = useState<Gender>("male");
    const router = useRouter();
    const dispatch = useAppDispatch();

    function handleSetGender(gender: Gender) {
        setGender(gender);
    }

    useEffect(() => {
        const sessionId = router.query.sessionId as string;

        socket.on(SOCKET_EMITTER.SESSION_DATA_SENT, (payload: SocketPayloadMap[SOCKET_EMITTER.SESSION_DATA_SENT]) => {
            const gameSession = payload.sessionData;
            if (gameSession) {
                dispatch(gameSessionUpdated(gameSession));
                console.log("game session sent")
            }
        });
        socketEmitter.setCurrentSessionId(sessionId);
        socketEmitter.emitRequestGameSession();
        return () => {
            socket.off(SOCKET_EMITTER.SESSION_DATA_SENT);
        }
    }, [])

    const sessionData = useAppSelector(state => state.gameSession.data);

    return (
        <div className={styles.container}>
            {sessionData && <>
                <div className={styles.chat}>CHAT</div>
                <div className={styles.players}>
                    <Players players={sessionData.players}/>
                </div>
                <div className={styles.settings}>
                    <GameSettings createGame={false}/>
                </div>
                <div className={styles.char}><Character
                    character={CHARACTER.EXPLORER}
                    gender={gender}
                    setGender={handleSetGender}
                /></div>
            </>}
        </div>
    )
}


export default Lobby;
