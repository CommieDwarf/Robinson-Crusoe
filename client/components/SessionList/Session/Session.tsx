import styles from "./Session.module.css";
import {capitalize} from "lodash";
import {useTranslation} from "react-i18next";


interface Props {
    name: string,
    host: string,
    playerAmount: number,
    maxPlayerAmount: number,
    scenario: string,
    password: boolean,
}


export function Session(props: Props) {
    const {t} = useTranslation();

    return <div className={`${styles.container}`}>
        <div className={`${styles.sessionInfo} ${styles.sessionInfoGrid}`}>
            <div className={`${styles.name}`}>{props.name}</div>
            <div className={styles.host}>{props.host}</div>
            <div className={styles.playerAmount}>{props.playerAmount}/{props.maxPlayerAmount}</div>
            <div className={styles.scenario}>{props.scenario}</div>
            <div className={styles.password}>
                {props.password ?
                    <i className={"icon-lock"}></i> :
                    <i className={"icon-lock-open"}></i>
                }
            </div>
        </div>
        <div className={styles.button}>{capitalize(t("menu.join"))}</div>
    </div>
}
