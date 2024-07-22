import styles from "./GameSettings.module.css";
import {capitalize} from "lodash";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {SOCKET_EVENT} from "@shared/types/Requests/Socket";
import {useRouter} from "next/router";
import {sessionValidationConfig as valConfig} from "@shared/constants/sessionValidationConfig";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {SessionSettings} from "@shared/types/SessionSettings";
import {setSocketListener} from "../../../pages/api/socket";
import {socketEmit} from "../../../middleware/socketMiddleware";
import {sessionIdUpdated} from "../../../reduxSlices/gameSession";

interface Props {
    editMode: boolean;
    host: boolean;
}

export function GameSettings(props: Props) {

    const [localSettings, setLocalSettings] = useState<Omit<SessionSettings, "quickGame">>({
        maxPlayers: 4,
        name: "Game",
        password: "",
        private: false,
        scenario: SCENARIO.CASTAWAYS,
    })
    const playerAmount = useAppSelector((state) => state.gameSession.data?.players.length);
    const serverSettings = useAppSelector((state) => state.gameSession.data?.settings);

    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    useEffect(() => {
        if (props.editMode && serverSettings) {
            setLocalSettings(serverSettings);
        }
    }, [serverSettings, props.editMode])


    const router = useRouter();

    function handleClick() {
        if (!props.editMode) {
            createSession();
        }
    }


    function createSession() {
        const settings = {
            scenario: localSettings.scenario,
            maxPlayers: localSettings.maxPlayers,
            private: localSettings.private,
            password: localSettings.password,
            name: localSettings.name,
        }

        const listeners = [
            setSocketListener(SOCKET_EVENT.GAME_SESSION_CREATED, (payload) => {
                dispatch(sessionIdUpdated(payload.sessionId));
                router.push(`./lobby/${payload.sessionId}`).then();
            })
        ];

        dispatch(socketEmit(SOCKET_EVENT.CREATE_SESSION, {settings}))

        return () => {
            listeners.forEach((listener) => listener.off());
        }
    }

    function handleNameChange(event: React.FormEvent<HTMLInputElement>) {
        const trimmed = event.currentTarget.value.trim().slice(0, valConfig.maxNameLength)
        saveSettings({name: trimmed});
    }

    function handlePrivateChange(event: React.FormEvent<HTMLInputElement>) {
        saveSettings({private: event.currentTarget.checked})
    }

    function handleScenarioChange(event: React.FormEvent<HTMLSelectElement>) {
        saveSettings({scenario: event.currentTarget.value as SCENARIO});
    }


    function handleMaxPlayersChange(event: React.FormEvent<HTMLSelectElement>) {
        let value = parseInt(event.currentTarget.value);
        const {maxPlayers, minPlayers} = valConfig;
        if (value > maxPlayers) {
            value = maxPlayers;
        } else if (value < minPlayers) {
            value = minPlayers;
        }
        saveSettings({maxPlayers: value})
    }

    function handlePasswordChange(event: React.FormEvent<HTMLInputElement>) {
        saveSettings({password: event.currentTarget.value});
    }


    function saveSettings(settings: Partial<SessionSettings>) {
        updateLocalSettings(settings);
        if (props.editMode && props.host) {
            updateServerSettings(settings);
        }
    }

    function updateLocalSettings(settings: Partial<SessionSettings>) {
        setLocalSettings((prev) => {
            return {...prev, ...settings}
        })
    }

    function updateServerSettings(settings: Partial<SessionSettings>) {
        dispatch(socketEmit(SOCKET_EVENT.UPDATE_SESSION_SETTINGS, {settings, hydrateSessionId: true}))
    }


    const scenarioInfo = (<div className={styles.scenarioInfo}>
        <div className={styles.scenarioInfoName}>
            <h3>{capitalize(t(`scenario.${localSettings.scenario}.name`))}</h3>
        </div>
        <div className={styles.scenarioInfoDescription}>
            {t(`scenario.${localSettings.scenario}.description`)}
        </div>
    </div>)

    const form = (<form className={styles.form}>
        {!props.editMode && <h2>{capitalize(t("menu.create game"))}</h2>}
        <div className={styles.row}>
            <span>{capitalize(t("menu.name"))}</span>
            {!props.editMode ? <input type={"text"} value={localSettings.name} onChange={handleNameChange}/>
                : <span>{localSettings.name}</span>}
        </div>
        {!props.editMode && <div className={styles.row}>
            <span>{capitalize(t("menu.password"))}</span>
            <input type={"password"} value={localSettings.password} onChange={handlePasswordChange}/>
        </div>}
        <div className={styles.row}>
            <span>{capitalize(t("menu.scenario"))}</span>
            {props.host ? <select onChange={handleScenarioChange} value={localSettings.scenario}>
                <option value={SCENARIO.CASTAWAYS}>{capitalize(t("scenario.castaways.name"))}</option>
            </select> : <span>{capitalize(t("scenario.castaways.name"))}</span>}
        </div>
        <div className={styles.row}>
            <span>{capitalize(t("menu.private game"))}</span>
            <input type={"checkbox"} onChange={handlePrivateChange} disabled={!props.host}
                   checked={localSettings.private}
                   value={"private"}/>
        </div>
        <div className={styles.row}>
            <span>Liczba graczy</span>
            {props.host ? <select onChange={handleMaxPlayersChange} value={localSettings.maxPlayers}>
                {[1, 2, 3, 4].map((num) => {
                    const disabled = Boolean(playerAmount && playerAmount > num);
                    return <option value={num} key={num} disabled={disabled}
                                   className={styles.option}>{num}</option>
                })}
            </select> : <span>{localSettings.maxPlayers}</span>}
        </div>
        {!props.editMode &&
            <div className={"menuButton"} onClick={handleClick}>{capitalize(t("menu.create game"))}</div>}
    </form>)

    return <div className={styles.container}>
        {props.editMode ? scenarioInfo : form}
        <hr className={styles.hr}/>
        {props.editMode ? form : scenarioInfo}
    </div>
}
