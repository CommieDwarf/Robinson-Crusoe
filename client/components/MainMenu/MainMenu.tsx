import styles from "./MainMenu.module.css";
import ResizableImage from "../ResizableImage/ResizableImage";
import Link from "next/link";
import React, {ReactElement, useState} from "react";
import {useAppSelector} from "../../store/hooks";
import {socketEmitter} from "../../pages/_app";

interface Props {
    UserComponent: ReactElement,
    authToken?: string
}

export function MainMenu({UserComponent, authToken}: Props) {

    const [isAnimated, setIsAnimated] = useState(false);
    const animationDurationMs = 200;

    const user = useAppSelector((state) => state.auth.user);

    function handleButtonClick(event: React.MouseEvent) {
        if (!user) {
            event.preventDefault();
            setIsAnimated(true)
            setTimeout(() => {
                setIsAnimated(false);
            }, animationDurationMs)
        } else {
            socketEmitter.createQuickGame();
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <ResizableImage src={"/title.png"} alt={"title"}/>
            </div>
            <div className={styles.wrapper}>
                <ul className={styles.menu}>
                    <Link
                        aria-disabled={!user}
                        href={"./Play"}
                        onClick={handleButtonClick}
                    >
                        <li className={`${styles.menuItem} ${!user && styles.menuItemDisabled}`}>
                            Szybka gra
                        </li>
                    </Link>
                    <Link href={"./Play"}
                          aria-disabled={!user}
                          onClick={handleButtonClick}
                    >
                        <li className={`${styles.menuItem} ${styles.button2} ${!user && styles.menuItemDisabled}`}
                        >
                            Multiplayer
                        </li>
                    </Link>
                    <li className={`${styles.menuItem} ${styles.button3}`}><Link href={"./Play"}>Opcje</Link></li>
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

