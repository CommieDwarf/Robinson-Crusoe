import styles from "./index.module.css";
import Loading from "../Loading";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Game from "../../components/Game/Game";
import {SOCKET_EVENT_CLIENT, SOCKET_EVENT_SERVER} from "@shared/types/Requests/Socket";
import {alertUpdated} from "../../reduxSlices/alert";
import {useRouter} from "next/router";
import {
    actionSlotUpdated,
    gameSessionUpdated,
    sessionIdUpdated
} from "../../reduxSlices/gameSession";
import {SESSION_CONNECTION_ERROR_CODE} from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";
import {socketEmit} from "../../middleware/socketMiddleware";
import {setSocketListener, SocketListener} from "../api/socket";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


type Props = {};

function Play(props: Props) {

    const gameData = useAppSelector((state) => {
        return state.gameSession.data?.game;
    });
    const router = useRouter();
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const sessionIdQuery = router.query.sessionId as string;


    const sessionId = useAppSelector(state => state.gameSession.sessionId);
    const [connectError, setConnectError] = useState<SESSION_CONNECTION_ERROR_CODE | null>(null);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (sessionIdQuery && !url.includes(sessionIdQuery)) {
                dispatch(socketEmit(SOCKET_EVENT_CLIENT.LEAVE_SESSION, {
                    hydrateSessionId: true,
                }))
            }
        };
        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        }
    }, [router, sessionId, dispatch, sessionIdQuery])

    useEffect(() => {
        if (sessionId !== sessionIdQuery) {
            dispatch(sessionIdUpdated(sessionIdQuery));
        } else {
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
        listeners.push(setSocketListener(SOCKET_EVENT_SERVER.SESSION_DATA_SENT, async (payload) => {
            const gameSession = payload.sessionData;
            if (gameSession) {
                dispatch(gameSessionUpdated(gameSession));
                dispatch(actionSlotUpdated(gameSession.game?.actionSlotService.slots));

                setConnectError(null);
            }
        }))

        listeners.push(setSocketListener(SOCKET_EVENT_SERVER.ALERT_SENT, (payload) => {
            dispatch(alertUpdated(payload.code));
        }))

        listeners.push(setSocketListener(SOCKET_EVENT_SERVER.SESSION_CONNECTION_STATUS_SENT,
            (payload) => {
                payload.error && setConnectError(payload.error);
            }))

        listeners.push(setSocketListener(SOCKET_EVENT_SERVER.SESSION_CHANGED, () => {
            dispatch(socketEmit(SOCKET_EVENT_CLIENT.SEND_SESSION_DATA, {hydrateSessionId: true}))
        }))

        listeners.push(setSocketListener(SOCKET_EVENT_SERVER.GAME_SAVED_STATUS, (payload) => {
            if (payload.success) {
                toast(t("toast.game saved"), {
                    type: "success",
                    theme: "colored"
                    
                });
            } else {
                toast(t("toast.unable to save game"), {
                    type: "error",
                    theme: "colored"
                });
            }
        }))
        dispatch(socketEmit(SOCKET_EVENT_CLIENT.SEND_SESSION_DATA, {hydrateSessionId: true}))

        return () => {
            listeners.forEach((listener) => listener.off());
        }
    }, [dispatch, router.isReady, sessionId, sessionIdQuery, t]);

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

