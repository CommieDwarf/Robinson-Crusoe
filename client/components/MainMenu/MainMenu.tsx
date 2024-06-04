import styles from "./MainMenu.module.css";
import ResizableImage from "../ResizableImage/ResizableImage";
import Link from "next/link";
import React, {ReactElement, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useRouter} from "next/router";
import {SOCKET_EVENT} from "@shared/types/Requests/Socket";
import sessionId from "../../pages/play/[sessionId]";
import {setSocketListener} from "../../pages/api/socket";
import {socketEmit} from "../../middleware/socketMiddleware";

interface Props {
    UserComponent: ReactElement,
}

export function MainMenu({UserComponent}: Props) {

    const [isAnimated, setIsAnimated] = useState(false);
    const animationDurationMs = 200;

    const [gameInProgress, setGameInProgress] = useState(false);

    const user = useAppSelector((state) => state.auth.user);

    const dispatch = useAppDispatch();

    const router = useRouter();

    function animateAuth(event: React.MouseEvent) {
        event.preventDefault();
        setIsAnimated(true)
        setTimeout(() => {
            setIsAnimated(false);
        }, animationDurationMs)
    }

    function handleQuickGameClick(event: React.MouseEvent) {
        if (!user) {
            animateAuth(event)
        }
        dispatch(socketEmit(SOCKET_EVENT.CREATE_QUICK_GAME, null))
    }

    function handleMultiPlayerClick(event: React.MouseEvent) {
        if (!user) {
            animateAuth(event)
        }
    }

    useEffect(() => {
        if (!user) {
            return;
        }

        const listener = setSocketListener(SOCKET_EVENT.IS_QUICK_GAME_IN_PROGRESS_RESPONSE, (payload) => {
            setGameInProgress(payload.value);
        })
        dispatch(socketEmit(SOCKET_EVENT.IS_QUICK_GAME_IN_PROGRESS, null))
        return () => {
            listener.off();
        }
    }, [user, dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <ResizableImage src={"/title.png"} alt={"title"}/>
            </div>
            <div className={styles.wrapper}>
                <ul className={styles.menu}>
                    {gameInProgress && <Link
                        aria-disabled={!user}
                        href={`./play/${sessionId}`}
                    >
                        <li className={`${styles.menuItem} ${!user && styles.menuItemDisabled}`}>
                            Continue
                        </li>
                    </Link>}
                    <Link
                        aria-disabled={!user}
                        href={"./play/quickgame"}
                        onClick={handleQuickGameClick}
                    >
                        <li className={`${styles.menuItem} ${!user && styles.menuItemDisabled}`}>
                            Quick game
                        </li>
                    </Link>
                    <Link href={"./multiplayer"}
                          aria-disabled={!user}
                          onClick={handleMultiPlayerClick}
                    >
                        <li className={`${styles.menuItem} ${styles.button2} ${!user && styles.menuItemDisabled}`}
                        >
                            Multiplayer
                        </li>
                    </Link>
                    <li className={`${styles.menuItem} ${styles.button3} ${styles.menuItemDisabled}`}><Link
                        href={"./Play"}>Settings</Link></li>
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

