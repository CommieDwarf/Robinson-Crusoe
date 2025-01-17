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
import {
	PartialSessionSettings,
	SessionSettings,
} from "@shared/types/SessionSettings";
import { setSocketListener } from "../../../pages/api/socket";
import { socketEmit } from "../../../middleware/socketMiddleware";
import { sessionIdUpdated } from "../../../reduxSlices/gameSession";
import { InvitationCode } from "./InvittationCode/InvitationCode";
import { sharedConfig } from "@shared/config/sharedConfig";
import { getScaledDifficultySettings } from "@shared/utils/getPlayerBasedDifficultySettings";

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
		difficultySettings: getScaledDifficultySettings(1),
	});

	function saveSettings(settings: PartialSessionSettings) {
		updateLocalSettings(settings);
		if (props.mode === GAME_SETTINGS_MODE.EDIT && props.host) {
			updateServerSettings(settings);
		}
	}

	function updateLocalSettings(updates: PartialSessionSettings) {
		setLocalSettings((prev) => {
			return {
				...prev,
				...updates,
				difficultySettings: {
					...prev.difficultySettings,
					...(updates.difficultySettings || {}),
				},
			};
		});
	}

	function updateServerSettings(settings: PartialSessionSettings) {
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.UPDATE_SESSION_SETTINGS, {
				settings,
				hydrateSessionId: true,
			})
		);
	}

	const playerAmount = useAppSelector(
		(state) => state.gameSession.data?.players.length
	);
	const serverSettings = useAppSelector(
		(state) => state.gameSession.data?.settings
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (props.mode === GAME_SETTINGS_MODE.EDIT && serverSettings) {
			console.log("updating settings!");
			console.log(serverSettings);
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
					dispatch(sessionIdUpdated(payload.sessionId));
					router.push(`/multiplayer/lobby/${payload.sessionId}`);
				}
			),
		];

		return () => {
			listeners.forEach((listener) => listener.off());
		};
	}, []);

	function createSession() {
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.CREATE_SESSION, {
				settings: localSettings,
			})
		);
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

	function handleDogChange(event: React.FormEvent<HTMLInputElement>) {
		saveSettings({
			difficultySettings: { dog: event.currentTarget.checked },
		});
	}
	function handleFridayChange(event: React.FormEvent<HTMLInputElement>) {
		saveSettings({
			difficultySettings: { friday: event.currentTarget.checked },
		});
	}
	function handleStartingEquipmentChange(
		event: React.FormEvent<HTMLSelectElement>
	) {
		saveSettings({
			difficultySettings: {
				startingEquipment: parseInt(event.currentTarget.value),
			},
		});
	}

	const [difficultyChangeDisabled, setDifficultyChangeDisabled] =
		useState<boolean>(true);

	function handleDifficultyTypeChange(
		event: React.FormEvent<HTMLSelectElement>
	) {
		const { value } = event.currentTarget;
		const scaled = value === "scaled";
		setDifficultyChangeDisabled(scaled);
		saveSettings({difficultySettings: {
			scaled
		}})
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
		<form
			className={`${styles.form} ${
				props.mode === GAME_SETTINGS_MODE.EDIT && styles.formLobby
			}`}
		>
			{props.mode === GAME_SETTINGS_MODE.GAME_CREATE && (
				<h2>{capitalize(t("menu.create game"))}</h2>
			)}
			<div className={styles.row}>
				<span className={styles.label}>
					{capitalize(t("menu.name"))}
				</span>
				{allowEdit ? (
					<input
						type={"text"}
						value={localSettings.name}
						onChange={handleNameChange}
						maxLength={sharedConfig.session.nameMaxLength}
						minLength={sharedConfig.session.nameMinLength}
						className={`${styles.input}`}
					/>
				) : (
					<span className={`${styles.sessionName} font-mono`}>
						{localSettings.name}
					</span>
				)}
			</div>
			{props.mode === GAME_SETTINGS_MODE.GAME_CREATE && (
				<div className={styles.row}>
					<span className={styles.label}>
						{capitalize(t("menu.password"))}
					</span>
					<input
						type={"password"}
						value={localSettings.password}
						onChange={handlePasswordChange}
						maxLength={sharedConfig.session.passwordMaxLength}
						minLength={sharedConfig.session.passwordMinLength}
						className={`${styles.input}`}
					/>
				</div>
			)}
			<div className={styles.row}>
				<span className={styles.label}>
					{capitalize(t("menu.scenario"))}
				</span>
				{allowEdit ? (
					<select
						onChange={handleScenarioChange}
						value={localSettings.scenario}
						className={`${styles.input}`}
					>
						<option value={SCENARIO.CASTAWAYS}>
							{capitalize(
								t(`scenario.${localSettings.scenario}.name`)
							)}
						</option>
					</select>
				) : (
					<span className={`font-mono`}>
						{capitalize(
							t(`scenario.${localSettings.scenario}.name`)
						)}
					</span>
				)}
			</div>

			<div className={`${styles.row}`}>
				<span className={styles.label}>
					{t("gameSettings.difficulty")}
				</span>
				<select className={`${styles.input}`} onChange={handleDifficultyTypeChange}>
					<option value="scaled">
						{t("gameSettings.based on player amount")}
					</option>
					<option value="custom">{t("gameSettings.custom")}</option>
				</select>
			</div>
			<div className={styles.row}>
				<div
					className={`${styles.difficultySettings} ${
						difficultyChangeDisabled && styles.disabled
					}`}
				>
					<div>
						<span>Piętaszek</span>
						<input
							type="checkbox"
							disabled={difficultyChangeDisabled}
							checked={localSettings.difficultySettings.friday}
							onChange={handleFridayChange}
						></input>
					</div>
					<div>
						<span>Pies</span>
						<input
							type="checkbox"
							onChange={handleDogChange}
							checked={localSettings.difficultySettings.dog}
							disabled={difficultyChangeDisabled}
						></input>
					</div>
					<div>
						<span>Przedmioty startowe </span>
						<select 
							disabled={difficultyChangeDisabled}
							value={localSettings.difficultySettings.startingEquipment}
							onChange={handleStartingEquipmentChange}
						>
							{[0, 1, 2, 3, 4].map((amount) => {
								return <option value={amount}>{amount}</option>;
							})}
						</select>
					</div>
				</div>
			</div>
			<div className={styles.row}>
				<span className={styles.label}>
					{capitalize(t("menu.private game"))}
				</span>
				<input
					type={"checkbox"}
					onChange={handlePrivateChange}
					disabled={!allowEdit}
					checked={localSettings.private}
					value={"private"}
					className={`${styles.input}`}
				/>
			</div>
			<div className={styles.row}>
				<span className={styles.label}>Liczba graczy</span>
				{allowEdit ? (
					<select
						onChange={handleMaxPlayersChange}
						value={localSettings.maxPlayers}
						className={`${styles.input}`}
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
					<span className="font-mono">
						{localSettings.maxPlayers}
					</span>
				)}
			</div>

			{props.mode === GAME_SETTINGS_MODE.GAME_CREATE && (
				<div className={"menuButton"} onClick={handleClick}>
					{capitalize(t("menu.create game"))}
				</div>
			)}
			{props.mode !== GAME_SETTINGS_MODE.GAME_CREATE && (
				<div className={styles.row}>
					<span className={styles.label}>
						{capitalize(t("menu.invitation code"))}
					</span>

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
		<div className={`${styles.container}`}>
			{displayOrder[props.mode].map((element, i) => (
				<Fragment key={i}>{element}</Fragment>
			))}
		</div>
	);
}
