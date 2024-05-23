import styles from "./index.module.css";
import {GameSettings} from "../../../components/Lobby/GameSettings/GameSettings";
import {Players} from "../../../components/Lobby/Players/Players";
import {Character} from "../../../components/Lobby/Character/Character";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {socket, socketEmitter} from "../../_app";
import {SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {gameSessionUpdated} from "../../../reduxSlices/gameSession";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {StartGamePanel} from "../../../components/Lobby/StartGame/StartGamePanel";
import {Gender} from "@shared/types/Game/Characters/Character";
import ChatLog from "../../../components/Game/UI/ChatLog/ChatLog";

export function Lobby() {
    const [gender, setGender] = useState<Gender>("male");
    const router = useRouter();
    const dispatch = useAppDispatch();

    const sessionId = router.query.sessionId as string;

    function handleSetGender(gender: Gender) {
        setGender(gender);
    }


    useEffect(() => {
        const handleRouteChange = () => {
            socketEmitter.emitLeaveSession(router.query.sessionId as string);
        };

        router.events.on('routeChangeStart', handleRouteChange);


        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router]);

    useEffect(() => {
        socket.on(SOCKET_EMITTER.SESSION_DATA_SENT, (payload: SocketPayloadMap[SOCKET_EMITTER.SESSION_DATA_SENT]) => {
            const gameSession = payload.sessionData;
            if (gameSession) {
                dispatch(gameSessionUpdated(gameSession));
            }
        });

        socket.on(SOCKET_EMITTER.PLAYER_KICKED, () => {
            router.push("./?msg=kicked")
        })

        socket.on(SOCKET_EMITTER.SESSION_CHANGED, () => {
            socketEmitter.emitRequestGameSession();
        })

        socket.on(SOCKET_EMITTER.PING, (payload: SocketPayloadMap[SOCKET_EMITTER.PING]) => {
            socketEmitter.emitPong(payload);
        })


        socketEmitter.setCurrentSessionId(sessionId);
        socketEmitter.emitRequestGameSession();


        return () => {
            socket.off(SOCKET_EMITTER.SESSION_DATA_SENT);
            socket.off(SOCKET_EMITTER.SESSION_CHANGED);
            socket.off(SOCKET_EMITTER.PLAYER_KICKED);
            socket.off(SOCKET_EMITTER.PING)
        }
    }, [])

    const sessionData = useAppSelector(state => state.gameSession.data);

    if (!sessionData) {
        socketEmitter.setCurrentSessionId(sessionId);
        socketEmitter.emitRequestGameSession();
    }


    return (
        <div className={styles.container}>
            {sessionData && <>
                <div className={styles.chat}>
                    <ChatLog enableLog={false} localUser={sessionData.localPlayer.username}/>
                </div>
                <div className={styles.players}>
                    <Players
                        players={sessionData.players}
                        localPlayer={sessionData.localPlayer}
                        host={sessionData.hostPlayer}
                    />
                </div>
                <div className={styles.startPanel}>
                    <StartGamePanel ready={sessionData.localPlayer.ready}/>
                </div>
                <div className={styles.settings}>
                    <GameSettings editMode={true} host={sessionData.localPlayer.id === sessionData.hostPlayer.id}/>
                </div>
                <div className={styles.char}>
                    <Character
                        character={sessionData.localPlayer.assignedCharacter.char}
                        gender={sessionData.localPlayer.assignedCharacter.gender}
                        setGender={handleSetGender}
                    /></div>
            </>}
        </div>
    )
}

export default Lobby;
