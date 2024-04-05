import styles from "./Header.module.css"
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";


export function Header() {

    const {t} = useTranslation();

    return <div className={`${styles.container}`}>
        <div className={`${styles.name}`}>{capitalize(t("menu.name"))}</div>
        <div className={styles.host}>{capitalize(t("menu.host"))}</div>
        <div className={styles.playerAmount}>{capitalize(t("menu.players"))}</div>
        <div className={styles.scenario}>{capitalize(t("menu.scenario"))}</div>
        <div className={styles.password}>{capitalize(t("menu.password"))}</div>
    </div>
}


