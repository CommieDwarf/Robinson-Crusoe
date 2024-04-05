import styles from "./GameSettings.module.css";
import {capitalize} from "lodash";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";
import {useTranslation} from "react-i18next";
import {useState} from "react";

interface Props {
    createGame: boolean;
}


export function GameSettings(props: Props) {

    const {t} = useTranslation();

    const [scenario, setScenario] = useState<SCENARIO>(SCENARIO.CASTAWAYS);
    const [visibility, setVisibility] = useState<"public" | "private">("public");
    const [playerAmount, setPlayerAmount] = useState<number>(4);


    return <div className={styles.container}>
        <form className={styles.form}>
            {props.createGame && <h2>{capitalize(t("menu.create game"))}</h2>}
            <div className={styles.row}>
                <span>{capitalize(t("menu.scenario"))}</span>
                <select>
                    <option value={[SCENARIO.CASTAWAYS]}>{capitalize(t("scenario.castaways.name"))}</option>
                </select>
            </div>
            <div className={styles.row}>
                <span>{capitalize(t("menu.visibility"))}</span>
                <select>
                    <option value={"private"}>{capitalize(t("menu.private"))}</option>
                    <option value={"public"}>{capitalize(t("menu.public"))}</option>
                </select>
            </div>
            <div className={styles.row}>
                <span>Liczba graczy</span>
                <select>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>
            <div className={styles.button}>{props.createGame ? "Stwórz" : "Zapisz"}</div>
        </form>
        <hr className={styles.hr}/>
        <div className={styles.scenarioInfo}>
            <div className={styles.scenarioInfoName}>
                <h3>{capitalize(t(`scenario.${scenario}.name`))}</h3>
            </div>
            <div className={styles.scenarioInfoDescription}>
                {t(`scenario.${scenario}.description`)}
            </div>
        </div>
    </div>
}
