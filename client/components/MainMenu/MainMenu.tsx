import styles from "./MainMenu.module.css";
import ResizableImage from "../ResizableImage/ResizableImage";
import Link from "next/link";
import React, {ReactElement, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useRouter} from "next/router";
import {SOCKET_EVENT_CLIENT, SOCKET_EVENT_SERVER} from "@shared/types/Requests/Socket";
import sessionId from "../../pages/play/[sessionId]";
import {setSocketListener} from "../../pages/api/socket";
import {socketEmit} from "../../middleware/socketMiddleware";
import { capitalizeAll } from "@shared/utils/capitalizeAll";
import { useTranslation } from "react-i18next";
import capitalize from "@shared/utils/capitalize";
import { gameSessionCleared, gameSessionUpdated } from "../../reduxSlices/gameSession";

interface Props {
    UserComponent: ReactElement,
}

export function MainMenu({UserComponent}: Props) {

    const [isAnimated, setIsAnimated] = useState(false);
    const animationDurationMs = 200;

    const [gameInProgress, setGameInProgress] = useState(false);

    const router = useRouter();
    const {t} = useTranslation();
    const socketConnected = useAppSelector((state) => state.connection.connected);
    const dispatch = useAppDispatch();


    useEffect(() => {
        const listeners = [
            setSocketListener(SOCKET_EVENT_SERVER.GAME_SESSION_CREATED, (payload) => {
                router.push("/play/" + payload.sessionId);
            }),
        ]
        return () => {
            listeners.forEach((listener) => listener.off());
        }
    })


    function animateAuth(event: React.MouseEvent) {
        event.preventDefault();
        setIsAnimated(true)
        setTimeout(() => {
            setIsAnimated(false);
        }, animationDurationMs)
    }

    function handleQuickGameClick(event: React.MouseEvent) {
        if (!socketConnected) {
            animateAuth(event)
        }
        dispatch(gameSessionCleared(null));
        dispatch(socketEmit(SOCKET_EVENT_CLIENT.CREATE_QUICK_GAME, null))
    }

    function handleMultiPlayerClick(event: React.MouseEvent) {
        if (!socketConnected) {
            animateAuth(event)
        }
    }

    // useEffect(() => {
    //     if (!user) {
    //         return;
    //     }

    //     const listener = setSocketListener(SOCKET_EVENT_CLIENT.IS_QUICK_GAME_IN_PROGRESS_RESPONSE, (payload) => {
    //         setGameInProgress(payload.value);
    //     })
    //     dispatch(socketEmit(SOCKET_EVENT_CLIENT.IS_QUICK_GAME_IN_PROGRESS, null))
    //     return () => {
    //         listener.off();
    //     }
    // }, [user, dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <ResizableImage src={"/title.png"} alt={"title"}/>
            </div>
            <div className={styles.wrapper}>
                <ul className={styles.menu}>
                    {gameInProgress && <Link
                        aria-disabled={!socketConnected}
                        href={`./play/${sessionId}`}
                    >
                        <li className={`${styles.menuItem} ${!socketConnected && styles.menuItemDisabled}`}>
                            Continue
                        </li>
                    </Link>}
                    <span
                        aria-disabled={!socketConnected}
                        onClick={handleQuickGameClick}
                    >
                        <li className={`${styles.menuItem} ${!socketConnected && styles.menuItemDisabled}`}>
                            {capitalizeAll(t("menu.quick game"))}
                        </li>
                    </span>
                    <Link href={"./multiplayer"}
                          aria-disabled={!socketConnected}
                          onClick={handleMultiPlayerClick}
                    >
                        <li className={`${styles.menuItem} ${styles.button2} ${!socketConnected && styles.menuItemDisabled}`}
                        >
                            {capitalizeAll(t("menu.multiplayer"))}
                        </li>
                    </Link>
                    <li className={`${styles.menuItem} ${styles.button3} ${styles.menuItemDisabled}`}><Link
                        href={"./Play"}>{capitalize(t("menu.settings"))}</Link></li>
                </ul>
                <div className={styles.UserPanelContainer}>
                    <div className={`${styles.userPanel} ${isAnimated && styles.pulsateOnce}`}>
                        {UserComponent}
                    </div>
                </div>
            </div>
        </div>
    );
}

