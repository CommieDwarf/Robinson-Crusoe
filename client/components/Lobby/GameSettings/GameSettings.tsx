import styles from "./GameSettings.module.css";
import { capitalize } from "lodash";
import { SCENARIO } from "@shared/types/Game/ScenarioService/SCENARIO";
import { useTranslation } from "react-i18next";
import React, { Fragment, useEffect, useState } from "react";
import {
	SOCKET_EVENT_CLIENT,
	SOCKET_EVENT_SERVER,
} from "@shared/types/Requests/Socket";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SessionSettings } from "@shared/types/SessionSettings";
import { setSocketListener } from "../../../pages/api/socket";
import { socketEmit } from "../../../middleware/socketMiddleware";
import { sessionIdUpdated } from "../../../reduxSlices/gameSession";
import { InvitationCode } from "./InvittationCode/InvitationCode";
import { sharedConfig } from "@shared/config/sharedConfig";

export enum GAME_SETTINGS_MODE {
	LOCKED = "locked",
	GAME_CREATE = "game create",
	EDIT = "edit",
}

interface Props {
	mode: GAME_SETTINGS_MODE;
	host: boolean;
}

export function GameSettings(props: Props) {
	const { t } = useTranslation();
	const username = useAppSelector((state) => state.connection.user?.username);

	const [localSettings, setLocalSettings] = useState<
		Omit<SessionSettings, "quickGame">
	>({
		maxPlayers: 4,
		name: capitalize(t("menu.default game name", { username })),
		password: "",
		private: false,
		scenario: SCENARIO.CASTAWAYS,
	});
	const playerAmount = useAppSelector(
		(state) => state.gameSession.data?.players.length
	);
	const serverSettings = useAppSelector(
		(state) => state.gameSession.data?.settings
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (props.mode === GAME_SETTINGS_MODE.EDIT && serverSettings) {
			setLocalSettings(serverSettings);
		}
	}, [serverSettings, props.mode]);

	const router = useRouter();

	function handleClick() {
		if (props.mode === GAME_SETTINGS_MODE.LOCKED) {
			return;
		}
		if (props.mode === GAME_SETTINGS_MODE.GAME_CREATE) {
			createSession();
		}
	}

	useEffect(() => {
		const listeners = [
			setSocketListener(
				SOCKET_EVENT_SERVER.GAME_SESSION_CREATED,
				(payload) => {
					alert("got event");
					dispatch(sessionIdUpdated(payload.sessionId));
					router.push(`/multiplayer/lobby/${payload.sessionId}`);
				}
			),
		];

		return () => {
			listeners.forEach((listener) => listener.off());
		};
	});

	function createSession() {
		const settings = {
			scenario: localSettings.scenario,
			maxPlayers: localSettings.maxPlayers,
			private: localSettings.private,
			password: localSettings.password,
			name: localSettings.name,
			quickGame: false,
		};

		dispatch(socketEmit(SOCKET_EVENT_CLIENT.CREATE_SESSION, { settings }));
	}

	function handleNameChange(event: React.FormEvent<HTMLInputElement>) {
		saveSettings({ name: event.currentTarget.value });
	}

	function handlePrivateChange(event: React.FormEvent<HTMLInputElement>) {
		saveSettings({ private: event.currentTarget.checked });
	}

	function handleScenarioChange(event: React.FormEvent<HTMLSelectElement>) {
		saveSettings({ scenario: event.currentTarget.value as SCENARIO });
	}

	function handleMaxPlayersChange(event: React.FormEvent<HTMLSelectElement>) {
		let value = parseInt(event.currentTarget.value);
		const { minPlayers, maxPlayers } = sharedConfig.session;
		if (value > maxPlayers) {
			value = maxPlayers;
		} else if (value < minPlayers) {
			value = maxPlayers;
		}
		saveSettings({ maxPlayers: value });
	}

	function handlePasswordChange(event: React.FormEvent<HTMLInputElement>) {
		saveSettings({ password: event.currentTarget.value });
	}

	function saveSettings(settings: Partial<SessionSettings>) {
		updateLocalSettings(settings);
		if (props.mode === GAME_SETTINGS_MODE.EDIT && props.host) {
			updateServerSettings(settings);
		}
	}

	function updateLocalSettings(settings: Partial<SessionSettings>) {
		setLocalSettings((prev) => {
			return { ...prev, ...settings };
		});
	}

	function updateServerSettings(settings: Partial<SessionSettings>) {
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.UPDATE_SESSION_SETTINGS, {
				settings,
				hydrateSessionId: true,
			})
		);
	}

	const allowEdit = props.host && props.mode !== GAME_SETTINGS_MODE.LOCKED;

	const scenarioInfo = (
		<div className={styles.scenarioInfo}>
			<div className={styles.scenarioInfoName}>
				<h3>
					{capitalize(t(`scenario.${localSettings.scenario}.name`))}
				</h3>
			</div>
			<div className={styles.scenarioInfoDescription}>
				{t(`scenario.${localSettings.scenario}.description`)}
			</div>
		</div>
	);

	const form = (
		<form className={`${styles.form} ${props.mode === GAME_SETTINGS_MODE.EDIT && styles.formLobby}`}>
			{props.mode === GAME_SETTINGS_MODE.GAME_CREATE && (
				<h2>{capitalize(t("menu.create game"))}</h2>
			)}
			<div className={styles.row}>
				<span>{capitalize(t("menu.name"))}</span>
				{allowEdit ? (
					<input
						type={"text"}
						value={localSettings.name}
						onChange={handleNameChange}
						maxLength={sharedConfig.session.nameMaxLength}
						minLength={sharedConfig.session.nameMinLength}
						className="font-mono"
					/>
				) : (
					<span className={`${styles.sessionName} font-mono`}>{localSettings.name}</span>
				)}
			</div>
			{props.mode === GAME_SETTINGS_MODE.GAME_CREATE && (
				<div className={styles.row}>
					<span>{capitalize(t("menu.password"))}</span>
					<input
						type={"password"}
						value={localSettings.password}
						onChange={handlePasswordChange}
						maxLength={sharedConfig.session.passwordMaxLength}
						minLength={sharedConfig.session.passwordMinLength}
						className="font-mono"
					/>
				</div>
			)}
			<div className={styles.row}>
				<span>{capitalize(t("menu.scenario"))}</span>
				{allowEdit ? (
					<select
						onChange={handleScenarioChange}
						value={localSettings.scenario}
						className="font-mono"
					>
						<option value={SCENARIO.CASTAWAYS}>
							{capitalize(
								t(`scenario.${localSettings.scenario}.name`)
							)}
						</option>
					</select>
				) : (
					<span className="font-mono">
						{capitalize(
							t(`scenario.${localSettings.scenario}.name`)
						)}
					</span>
				)}
			</div>
			<div className={styles.row}>
				<span>{capitalize(t("menu.private game"))}</span>
				<input
					type={"checkbox"}
					onChange={handlePrivateChange}
					disabled={!allowEdit}
					checked={localSettings.private}
					value={"private"}
				/>
			</div>
			<div className={styles.row}>
				<span>Liczba graczy</span>
				{allowEdit ? (
					<select
						onChange={handleMaxPlayersChange}
						value={localSettings.maxPlayers}
						className="font-mono"
					>
						{[1, 2, 3, 4].map((num) => {
							const disabled = Boolean(
								playerAmount && playerAmount > num && props.mode
							);
							return (
								<option
									value={num}
									key={num}
									disabled={disabled}
									className={styles.option}
								>
									{num}
								</option>
							);
						})}
					</select>
				) : (
					<span className="font-mono">{localSettings.maxPlayers}</span>
				)}
			</div>
			{props.mode === GAME_SETTINGS_MODE.GAME_CREATE && (
				<div className={"menuButton"} onClick={handleClick}>
					{capitalize(t("menu.create game"))}
				</div>
			)}
			{props.mode !== GAME_SETTINGS_MODE.GAME_CREATE && (
				<div className={styles.row}>
					<InvitationCode />
				</div>
			)}
		</form>
	);

	const hr = <hr className={styles.hr} />;

	const displayOrder = {
		[GAME_SETTINGS_MODE.GAME_CREATE]: [form, hr, scenarioInfo],
		[GAME_SETTINGS_MODE.EDIT]: [scenarioInfo, hr, form],
		[GAME_SETTINGS_MODE.LOCKED]: [scenarioInfo, hr, form],
	};

	return (
		<div className={styles.container}>
			{displayOrder[props.mode].map((element, i) => (
				<Fragment key={i}>{element}</Fragment>
			))}
		</div>
	);
}
