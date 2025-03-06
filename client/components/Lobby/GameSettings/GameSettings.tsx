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
import { CheckBox } from "components/Checkbox/CheckBox";

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

	function handleDifficultyTypeChange(
		event: React.FormEvent<HTMLSelectElement>
	) {
		const { value } = event.currentTarget;
		const scaled = value === "scaled";

		if (props.mode === GAME_SETTINGS_MODE.GAME_CREATE && scaled) {
			saveSettings({
				difficultySettings: getScaledDifficultySettings(1),
			});
		} else {
			saveSettings({
				difficultySettings: {
					scaled,
				},
			});
		}
	}

	const editAllowed = props.host && props.mode !== GAME_SETTINGS_MODE.LOCKED;

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
				{editAllowed ? (
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
				{editAllowed ? (
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
				<select
					className={`${styles.input}`}
					onChange={handleDifficultyTypeChange}
					value={
						localSettings.difficultySettings.scaled
							? "scaled"
							: "custom"
					}
					disabled={!editAllowed}
				>
					<option value="scaled">{t("gameSettings.scaled")}</option>
					<option value="custom">{t("gameSettings.custom")}</option>
				</select>
			</div>
			<div className={styles.row}>
				<div
					className={`${styles.difficultySettings} ${
						localSettings.difficultySettings.scaled &&
						styles.disabled
					}`}
				>
					<div className={styles.difficultySetting}>
						<div className={styles.difficultyLabel}>Piętaszek</div>
						<CheckBox
							disabled={
								localSettings.difficultySettings.scaled ||
								!editAllowed
							}
							checked={localSettings.difficultySettings.friday}
							onChange={handleFridayChange}
							className={styles.difficultySetting}
						/>
					</div>
					<div className={styles.difficultySetting}>
						<div className={styles.difficultyLabel}>Pies</div>
						<CheckBox
							onChange={handleDogChange}
							checked={localSettings.difficultySettings.dog}
							disabled={
								localSettings.difficultySettings.scaled ||
								!editAllowed
							}
							className={styles.difficultySetting}
						></CheckBox>
					</div>
					<div className={styles.difficultySetting}>
						<div className={styles.difficultyLabel}>
							Przedmioty startowe{" "}
						</div>
						<select
							disabled={
								localSettings.difficultySettings.scaled ||
								!editAllowed
							}
							value={
								localSettings.difficultySettings
									.startingEquipment
							}
							className={styles.difficultySetting}
							onChange={handleStartingEquipmentChange}
						>
							{[0, 1, 2, 3, 4].map((amount, i) => {
								return (
									<option value={amount} key={i}>
										{amount}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			</div>
			<div className={styles.row}>
				<span className={styles.label}>
					{capitalize(t("menu.private game"))}
				</span>
				<CheckBox
					onChange={handlePrivateChange}
					disabled={!editAllowed}
					checked={localSettings.private}
					value={"private"}
					className={`${styles.input}`}
				/>
			</div>
			<div className={styles.row}>
				<span className={styles.label}>Liczba graczy</span>
				{editAllowed ? (
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
