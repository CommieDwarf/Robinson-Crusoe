import styles from "./MainMenu.module.css";
import ResizableImage from "../ResizableImage/ResizableImage";
import Link from "next/link";
import React, {ReactElement, useEffect, useState} from "react";
import {useAppSelector} from "../../store/hooks";
import {socket, socketEmitter} from "../../pages/_app";
import {useRouter} from "next/router";
import {SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";

interface Props {
    UserComponent: ReactElement,
}

export function MainMenu({UserComponent}: Props) {

    const [isAnimated, setIsAnimated] = useState(false);
    const animationDurationMs = 200;

    const [gameInProgress, setGameInProgress] = useState(false);

    const user = useAppSelector((state) => state.auth.user);

    const router = useRouter();

    function handleButtonClick(event: React.MouseEvent) {
        if (!user) {
            event.preventDefault();
            setIsAnimated(true)
            setTimeout(() => {
                setIsAnimated(false);
            }, animationDurationMs)
        } else {
            socketEmitter.emitCreateQuickGame();
        }
    }

    useEffect(() => {
        if (!user) {
            return;
        }
        socketEmitter.emitIsGameInProgress();
        socket.on(SOCKET_EMITTER.IS_QUICK_GAME_IN_PROGRESS_RESPONSE,
            (payload: SocketPayloadMap[SOCKET_EMITTER.IS_QUICK_GAME_IN_PROGRESS_RESPONSE]) => {
                setGameInProgress(payload.value)
            })

        return () => {
            socket.off(SOCKET_EMITTER.IS_QUICK_GAME_IN_PROGRESS_RESPONSE);
        }
    }, [user])


    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <ResizableImage src={"/title.png"} alt={"title"}/>
            </div>
            <div className={styles.wrapper}>
                <ul className={styles.menu}>
                    {gameInProgress && <Link
                        aria-disabled={!user}
                        href={"./Play"}
                    >
                        <li className={`${styles.menuItem} ${!user && styles.menuItemDisabled}`}>
                            Continue
                        </li>
                    </Link>}
                    <Link
                        aria-disabled={!user}
                        href={"./Play/?sessionId=quickgame"}
                        onClick={handleButtonClick}
                    >
                        <li className={`${styles.menuItem} ${!user && styles.menuItemDisabled}`}>
                            Quick game
                        </li>
                    </Link>
                    <Link href={"./multiplayer"}
                          aria-disabled={!user}
                          onClick={handleButtonClick}
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

