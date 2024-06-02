import styles from "./play.module.css";
import Loading from "../Loading";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Game from "../../components/Game/Game";
import {socket, socketEmitter} from "../_app";
import {SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {ALERT_CODE} from "@shared/types/ALERT_CODE";
import {alertUpdated} from "../../reduxSlices/alert";
import {useRouter} from "next/router";
import {actionSlotUpdated, gameSessionUpdated, selectGame} from "../../reduxSlices/gameSession";

type Props = {};

function Play(props: Props) {
    const gameData = useAppSelector((state) => {
        return state.gameSession.data?.game;
    });
    const router = useRouter();
    const dispatch = useAppDispatch();
    const sessionId = router.query.sessionId as string;

    if (!gameData) {
        socketEmitter.setCurrentSessionId(sessionId);
        socketEmitter.emitRequestGameSession();
    }

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            router.push("/").then();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [router]);

    useEffect(() => {
        socket.on(SOCKET_EMITTER.SESSION_DATA_SENT, (payload: SocketPayloadMap[SOCKET_EMITTER.SESSION_DATA_SENT]) => {
            const gameSession = payload.sessionData;
            if (gameSession) {
                console.log("gameSession received")
                dispatch(gameSessionUpdated(gameSession));
                dispatch(actionSlotUpdated(gameSession.game?.actionSlotService.slots));
            }
        });
        socket.on("alert_sent", (payload: { message: ALERT_CODE }) => {
            dispatch(alertUpdated(payload.message));
        })

        socketEmitter.setCurrentSessionId(sessionId);
        socketEmitter.emitRequestGameSession();
        return () => {
            socket.off("alert_sent")
            socket.off(SOCKET_EMITTER.SESSION_DATA_SENT);
        }
    }, [dispatch, router.query.sessionId, sessionId]);

    return (
        <div className={styles.container}>
            {gameData ? (
                <Game
                />
            ) : <Loading/>}
        </div>
    )
}

export default Play;

