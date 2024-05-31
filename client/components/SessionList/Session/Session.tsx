import styles from "./Session.module.css";
import {capitalize} from "lodash";
import {useTranslation} from "react-i18next";
import {socketEmitter} from "../../../pages/_app";
import {shortenWithTripleDots} from "../../../utils/shortenWithTripleDots";


interface Props {
    name: string,
    host: string,
    playerAmount: number,
    maxPlayerAmount: number,
    scenario: string,
    password: boolean,
    id: string,
    setEnterSessionId: (sessionId: string) => void;
    shortMode?: boolean;
    hidePassword?: boolean;
}


export function Session(props: Props) {
    const {t} = useTranslation();

    function handleClick() {
        if (props.password) {
            props.setEnterSessionId(props.id);
        } else {
            socketEmitter.emitJoinSession(props.id, "");
        }
    }

    const shortStrLength = 6;

    let name = props.name;
    let host = props.host;
    let scenario = props.scenario

    if (props.shortMode) {
        name = shortenIfTooLong(name);
        host = shortenIfTooLong(host);
        scenario = shortenIfTooLong(scenario);

    }

    function shortenIfTooLong(str: string) {
        if (str.length > shortStrLength) {
            return shortenWithTripleDots(str, shortStrLength);
        } else {
            return str;
        }
    }

    return <div className={`${styles.container}`}>
        <div
            className={`${styles.sessionInfo} ${styles.sessionInfoGrid} ${props.shortMode && styles.sessionInfoShortened}`}>
            <div className={`${styles.name}`}>{name}</div>
            <div className={styles.host}>{host}</div>
            <div className={styles.playerAmount}>{props.playerAmount}/{props.maxPlayerAmount}</div>
            <div className={styles.scenario}>{scenario}</div>
            {!props.hidePassword && <div className={styles.password}>
                {props.password ?
                    <i className={"icon-lock"}></i> :
                    <i className={"icon-lock-open"}></i>
                }
            </div>}
        </div>
        <div className={styles.button} onClick={handleClick}>{capitalize(t("menu.join"))}</div>
    </div>
}
