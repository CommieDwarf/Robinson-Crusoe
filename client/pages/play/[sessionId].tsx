import styles from "./index.module.css";
import Loading from "../Loading";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Game from "../../components/Game/Game";
import {SOCKET_EVENT} from "@shared/types/Requests/Socket";
import {alertUpdated} from "../../reduxSlices/alert";
import {useRouter} from "next/router";
import {
    actionSlotsPartiallyUpdated,
    actionSlotUpdated,
    gameSessionUpdated, selectActionSlotService,
    sessionIdUpdated
} from "../../reduxSlices/gameSession";
import {SESSION_CONNECTION_ERROR_CODE} from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";
import {socketEmit} from "../../middleware/socketMiddleware";
import {setSocketListener, SocketListener} from "../api/socket";
import {getObjectsComparator} from "../../utils/getObjectsComparator";
import {sleep} from "@shared/utils/sleep";
import {IActionSlotServiceRenderData} from "@shared/types/Game/ActionSlots";
import {IPawnRenderData} from "@shared/types/Game/Pawns/Pawn";
import {resetServerContext} from "react-beautiful-dnd";

type Props = {};

function Play(props: Props) {

    console.log("hello from sessionId")
    const gameData = useAppSelector((state) => {
        return state.gameSession.data?.game;
    });
    const router = useRouter();
    const dispatch = useAppDispatch();
    const sessionIdQuery = router.query.sessionId as string;

    const actionSlots = useAppSelector((state) => selectActionSlotService(state)?.slots);

    const sessionId = useAppSelector(state => state.gameSession.sessionId);
    const [connectError, setConnectError] = useState<SESSION_CONNECTION_ERROR_CODE | null>(null);


    useEffect(() => {
        if (sessionId !== sessionIdQuery) {
            console.log("updating session id")
            dispatch(sessionIdUpdated(sessionIdQuery));
        } else {
            console.log("not updating session id")
        }
    }, [sessionId, sessionIdQuery, dispatch])

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
        if (!sessionId) {
            return;
        }


        const listeners: SocketListener[] = [];
        listeners.push(setSocketListener(SOCKET_EVENT.SESSION_DATA_SENT, async (payload) => {
            const gameSession = payload.sessionData;
            if (gameSession) {
                const date = new Date();
                const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                console.log("gameSession received at:", time);
                console.log(gameSession);
                dispatch(gameSessionUpdated(gameSession));
                dispatch(actionSlotUpdated(gameSession.game?.actionSlotService.slots));

                setConnectError(null);
            }
        }))

        listeners.push(setSocketListener(SOCKET_EVENT.ALERT_SENT, (payload) => {
            dispatch(alertUpdated(payload.code));
        }))

        listeners.push(setSocketListener(SOCKET_EVENT.SESSION_CONNECTION_FAILED,
            (payload) => {
                setConnectError(payload.error);
            }))

        listeners.push(setSocketListener(SOCKET_EVENT.SESSION_CHANGED, () => {
            dispatch(socketEmit(SOCKET_EVENT.SESSION_DATA_REQUESTED, {hydrateSessionId: true}))
        }))

        console.log("requesting session", sessionIdQuery)
        dispatch(socketEmit(SOCKET_EVENT.SESSION_DATA_REQUESTED, {hydrateSessionId: true}))
        console.log("requesting session data", sessionId);

        return () => {
            listeners.forEach((listener) => listener.off());
        }
    }, [dispatch, router.isReady, sessionId, sessionIdQuery]);

    return (
        <div className={styles.container}>
            {gameData && !connectError && <Game/>}
            {!gameData && !connectError && <Loading/>}
            {connectError && <div>
                {connectError}
            </div>}
        </div>
    )
}

export default Play;

