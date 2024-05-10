import styles from "./GameSettings.module.css";
import {capitalize} from "lodash";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {socket, socketEmitter} from "../../../pages/_app";
import {GameSessionCreatedPayload, SOCKET_EMITTER} from "@shared/types/Requests/Socket";
import {useRouter} from "next/router";
import {sessionValidationConfig as valConfig} from "@shared/constants/sessionValidationConfig";

interface Props {
    createGame: boolean;
}

export function GameSettings(props: Props) {

    const {t} = useTranslation();

    const [scenario, setScenario] = useState<SCENARIO>(SCENARIO.CASTAWAYS);
    const [privateSession, setPrivateSession] = useState(false);
    const [sessionName, setSessionName] = useState("Moja gra");
    const [maxPlayers, setMaxPlayers] = useState<number>(4);
    const [password, setPassword] = useState("");


    const router = useRouter();

    function handleClick() {
        if (props.createGame) {
            createSession();
        } else {
            // ....
        }
    }

    function createSession() {
        socketEmitter.emitCreateSession({
            scenario,
            maxPlayers,
            private: privateSession,
            quickGame: false,
            password,
            name: sessionName,
        })
        socket.on(SOCKET_EMITTER.GAME_SESSION_CREATED, (payload: GameSessionCreatedPayload) => {
            console.log("created", payload);
            router.push(`./lobby/?sessionId=${payload.sessionId}`);
            socket.off(SOCKET_EMITTER.GAME_SESSION_CREATED);
        })
    }

    function handleNameChange(event: React.FormEvent<HTMLInputElement>) {
        setSessionName(event.currentTarget.value.slice(0, valConfig.maxNameLength));
    }

    function handlePrivateChange(event: React.FormEvent<HTMLInputElement>) {
        setPrivateSession(prev => !prev);
    }

    function handleScenarioChange(event: React.FormEvent<HTMLSelectElement>) {
        setScenario(event.currentTarget.value as SCENARIO);
    }

    function handleMaxPlayersChange(event: React.FormEvent<HTMLSelectElement>) {
        let valNum = parseInt(event.currentTarget.value);
        const {maxPlayers} = valConfig;
        const {minPlayers} = valConfig;
        if (valNum > maxPlayers) {
            valNum = maxPlayers;
        } else if (valNum < minPlayers) {
            valNum = minPlayers;
        }
        setMaxPlayers(valNum);
    }

    function handlePasswordChange(event: React.FormEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value.slice(0, valConfig.maxPasswordLength));
    }


    const scenarioInfo = (<div className={styles.scenarioInfo}>
        <div className={styles.scenarioInfoName}>
            <h3>{capitalize(t(`scenario.${scenario}.name`))}</h3>
        </div>
        <div className={styles.scenarioInfoDescription}>
            {t(`scenario.${scenario}.description`)}
        </div>
    </div>)

    const form = (<form className={styles.form}>
        {props.createGame && <h2>{capitalize(t("menu.create game"))}</h2>}
        <div className={styles.row}>
            <span>{capitalize(t("menu.name"))}</span>
            {props.createGame ? <input type={"text"} value={sessionName} onChange={handleNameChange}/>
                : <span>{sessionName}</span>}
        </div>
        {props.createGame && <div className={styles.row}>
            <span>{capitalize(t("menu.password"))}</span>
            <input type={"password"} value={password} onChange={handlePasswordChange}/>
        </div>}
        <div className={styles.row}>
            <span>{capitalize(t("menu.scenario"))}</span>
            <select onChange={handleScenarioChange} value={scenario}>
                <option value={SCENARIO.CASTAWAYS}>{capitalize(t("scenario.castaways.name"))}</option>
            </select>
        </div>
        <div className={styles.row}>
            <span>{capitalize(t("menu.private game"))}</span>
            <input type={"checkbox"} onChange={handlePrivateChange} checked={privateSession} value={"private"}/>
        </div>
        <div className={styles.row}>
            <span>Liczba graczy</span>
            <select onChange={handleMaxPlayersChange} value={maxPlayers}>
                {[1, 2, 3, 4].map((num) => {
                    return <option value={num} key={num}>{num}</option>
                })}
            </select>
        </div>
        <div className={styles.button} onClick={handleClick}>{props.createGame ? "Stwórz" : "Zapisz"}</div>
    </form>)

    return <div className={styles.container}>
        {props.createGame ? form : scenarioInfo}
        <hr className={styles.hr}/>
        {props.createGame ? scenarioInfo : form}
    </div>
}
