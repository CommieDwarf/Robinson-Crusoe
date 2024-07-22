import styles from "./index.module.css";
import {GameSettings} from "../../../components/Lobby/GameSettings/GameSettings";
import {Players} from "../../../components/Lobby/Players/Players";
import {Character} from "../../../components/Lobby/Character/Character";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {SOCKET_EVENT} from "@shared/types/Requests/Socket";
import {gameSessionUpdated, sessionIdUpdated} from "../../../reduxSlices/gameSession";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ControlPanel} from "../../../components/Lobby/ControlPanel/ControlPanel";
import {Gender} from "@shared/types/Game/Characters/Character";
import ChatLog from "../../../components/Game/UI/ChatLog/ChatLog";
import {socketEmit} from "../../../middleware/socketMiddleware";
import {setSocketListener} from "../../api/socket";

export function Lobby() {
    const [gender, setGender] = useState<Gender>("male");
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loaded, setLoaded] = useState(false);

    const sessionIdQuery = router.query.sessionId as string;

    const sessionId = useAppSelector(state => state.gameSession.sessionId);
    const sessionData = useAppSelector(state => state.gameSession.data);

    if (sessionData?.game && loaded) {
        router.push(`/play/${sessionData.id}`).then();
    }

    useEffect(() => {
        dispatch(sessionIdUpdated(sessionIdQuery));
        console.log("getting session id", sessionIdQuery)
    }, [sessionIdQuery, dispatch])

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (sessionIdQuery && !url.includes(sessionIdQuery)) {
                console.log(sessionIdQuery, url);
                dispatch(socketEmit(SOCKET_EVENT.USER_LEFT_LOBBY, {
                    hydrateSessionId: true,
                }))
            }
        };
        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        }
    }, [router, sessionId, dispatch])

    useEffect(() => {
        if (!sessionId) {
            return;
        }
        const listeners = [
            setSocketListener(SOCKET_EVENT.SESSION_DATA_SENT, (payload) => {
                const gameSession = payload.sessionData;
                console.log('received session data');
                if (gameSession) {
                    dispatch(gameSessionUpdated(gameSession));
                    setLoaded(true);
                    if (gameSession.game) {
                        router.push("/play/" + sessionId).then();
                    }
                }
            }),
            setSocketListener(SOCKET_EVENT.PLAYER_KICKED, () => {
                router.push("./?msg=kicked").then();
            }),
            setSocketListener(SOCKET_EVENT.SESSION_CHANGED, () => {
                dispatch(socketEmit(SOCKET_EVENT.SESSION_DATA_REQUESTED, {hydrateSessionId: true}))
            }),
            setSocketListener(SOCKET_EVENT.PING, (payload) => {
                dispatch(socketEmit(SOCKET_EVENT.PONG, payload));
            }),
            setSocketListener(SOCKET_EVENT.GAME_STARTED, (payload) => {
                router.push(`/play/${payload.sessionId}`).then();
            })
        ]

        console.log("requested session data id:", sessionId);
        dispatch(socketEmit(SOCKET_EVENT.SESSION_DATA_REQUESTED, {hydrateSessionId: true}))

        return () => {
            listeners.forEach(listener => listener.off());
        }
    }, [dispatch, router, sessionId])


    function handleSetGender(gender: Gender) {
        setGender(gender);
    }

    return (
        <div className={styles.container}>
            {sessionData && <>
                <div className={styles.chat}>
                    <ChatLog enableLog={false}/>
                </div>
                <div className={styles.players}>
                    <Players
                        players={sessionData.players}
                        localPlayer={sessionData.localPlayer}
                        host={sessionData.hostPlayer}
                    />
                </div>
                <div className={styles.startPanel}>
                    <ControlPanel ready={sessionData.localPlayer.ready}
                                  startEnabled={sessionData.players.every((player) => player.ready)}/>
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



