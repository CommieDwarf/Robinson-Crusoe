import styles from "./index.module.css";
import {SessionList} from "../../components/SessionList/SessionList";
import ResizableImage from "../../components/ResizableImage/ResizableImage";

import menuIcon from "/public/UI/icons/menu.png";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";
import Link from "next/link";

interface Props {

}

export function Multiplayer() {

    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <div className={styles.buttons}>
                    <Link href={"../"}>
                        <div className={styles.menuButton}>
                            <ResizableImage src={menuIcon} alt={"Menu"}/>
                        </div>
                    </Link>
                    <div className={`${styles.button} ${styles.buttonRefresh}`}>
                        {capitalize(t("menu.refresh"))}
                    </div>
                    <Link href={"./multiplayer/creategame"}>
                        <div className={styles.button}>
                            {capitalize(t("menu.create game"))}
                        </div>
                    </Link>
                </div>
                <div className={styles.joinBySessionId}>
                    <div className={styles.joinBySessionIdText}>
                        {capitalize(t("menu.join with game code"))}
                    </div>
                    <div className={styles.joinBySessionIdInput}>
                        <input type={"text"}></input>
                    </div>
                    <div className={styles.button}>
                        {capitalize(t("menu.join"))}
                    </div>
                </div>
            </div>
            <SessionList/>
        </div>)
}

export default Multiplayer
