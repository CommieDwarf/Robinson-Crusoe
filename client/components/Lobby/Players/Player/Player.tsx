import styles from "./Player.module.css";
import bootKickImg from "/public/UI/boot-kick.webp";
import DynamicImage from "../../../DynamicImage/DynamicImage";
import { useTranslation } from "react-i18next";
import { IPlayerRenderData } from "@shared/types/Game/PlayerService/Player";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CHARACTER } from "@shared/types/Game/Characters/Character";
import checkMark from "/public/UI/misc/check-mark.webp";
import xMarkImg from "/public/UI/misc/x-mark.webp";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import { PlayerLatency } from "../../../PlayerLatency/PlayerLatency";
import capitalize from "@shared/utils/capitalize";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { socketEmit } from "../../../../middleware/socketMiddleware";
import Select from "react-select";
import { PLAYER_COLOR } from "@shared/types/Game/PLAYER_COLOR";
import { selectPlayerLatency } from "../../../../reduxSlices/gameSession";
import { UserAvatar } from "../../../UserProfile/UserAvatar/UserAvatar";
import { darkenColor } from "utils/darkenColor";

interface Props {
	player: IPlayerRenderData;
	local: boolean;
	host: boolean;
	hostControls: boolean;
	duplicatedCharacter: boolean;
}

export function Player(props: Props) {
	const [character, setCharacter] = useState<CHARACTER>(
		props.player.assignedCharacter.char
	);
	const [playerColor, setPlayerColor] = useState<PLAYER_COLOR>(
		props.player.color
	);
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const latency = useAppSelector((state) =>
		selectPlayerLatency(state, props.player.id)
	);

	useEffect(() => {
		setCharacter(props.player.assignedCharacter.char);
	}, [props.player.assignedCharacter.char]);

	useEffect(() => {
		setPlayerColor(props.player.color);
	}, [props.player.color]);

	function handleCharacterChange(event: ChangeEvent<HTMLSelectElement>) {
		setCharacter(event.currentTarget.value as CHARACTER);
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.CHANGE_CHARACTER, {
				character: {
					char: event.currentTarget.value as CHARACTER,
				},
				hydrateSessionId: true,
			})
		);
	}

	function handleColorChange(color: PLAYER_COLOR) {
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.CHANGE_PLAYER_COLOR, {
				hydrateSessionId: true,
				color,
			})
		);
		setPlayerColor(color);
	}

	function handleKickClick() {
		if (props.hostControls && !props.host) {
			dispatch(
				socketEmit(SOCKET_EVENT_CLIENT.KICK_PLAYER, {
					playerId: props.player.id,
					hydrateSessionId: true,
				})
			);
		}
	}

	function handleReadyClick() {
		if (props.local) {
			dispatch(
				socketEmit(SOCKET_EVENT_CLIENT.SET_PLAYER_READY, {
					value: props.player.ready,
					hydrateSessionId: true,
				})
			);
		}
	}

	return (
		<div
			className={`${styles.container} ${
				props.local && styles.localPlayer
			} ${props.player.isPlaceHolder && styles.containerPlaceholder}`}
		>
			<div
				className={`${styles.readiness} ${
					props.player.ready && styles.readinessReady
				}`}
				onClick={handleReadyClick}
			>
				{props.player.ready ? (
					<DynamicImage src={checkMark} alt={"readiness"} />
				) : (
					<DynamicImage src={xMarkImg} alt={"readiness"} />
				)}
			</div>

			<div className={styles.avatar}>
				{<UserAvatar username={props.player.username} />}
			</div>

			<div className={`${styles.name} font-mono`}>
				{props.player.username}
				{props.host && (
					<div className={styles.host}>
						<DynamicImage
							src={"/UI/misc/crown.webp"}
							alt={"host"}
							fill
						/>
					</div>
				)}
			</div>

			<div className={`${styles.character}`}>
				<select
					onChange={handleCharacterChange}
					disabled={!props.local}
					value={character}
					className={`${
						props.duplicatedCharacter && styles.duplicatedCharacter
					}`}
				>
					<option value={CHARACTER.COOK}>
						{capitalize(t("character.cook"))}
					</option>
					<option value={CHARACTER.EXPLORER}>
						{capitalize(t("character.explorer"))}
					</option>
					<option value={CHARACTER.CARPENTER}>
						{capitalize(t("character.carpenter"))}
					</option>
					<option value={CHARACTER.SOLDIER}>
						{capitalize(t("character.soldier"))}
					</option>
				</select>
			</div>
			<div>
				<Select
					className={styles.colorSelect}
					isDisabled={!props.local}
					isSearchable={false}
					options={Object.values(PLAYER_COLOR).map((color) => ({
						value: color,
						label: "",
					}))}
					value={{ value: playerColor, label: "" }}
					styles={{
						control: (baseStyles, state) => ({
							...baseStyles,
							height: 20,
							maxHeight: 20,
							minHeight: 20,
							padding: 0,
							fontSize: 12,
							border: "none",
							outline: state.isFocused
								? `2px solid ${darkenColor(playerColor)}`
								: "none",
							":hover": {},
							backgroundColor: playerColor,
						}),
						dropdownIndicator: (styles) => ({
							...styles,
							marginTop: "-15%",
							color: darkenColor(playerColor),
						}),
						clearIndicator: (styles) => ({
							...styles,
							padding: 0,
							color: "red",
						}),
						indicatorSeparator: () => ({
							hidden: true,
						}),
						valueContainer: (styles) => ({
							...styles,
							paddingTop: 0,
							paddingBottom: 0,
							paddingLeft: 5,
							paddingRight: 5,
							marginTop: 0,
						}),
						input: (styles) => ({
							...styles,
							margin: 0,
						}),
						option: (
							styles,
							{ data }
						) => {
							return {
								...styles,
								backgroundColor: data.value,
								height: 20,
								maxHeight: 20,
								minHeight: 20,
								padding: 0,
								fontSize: 12,
							};
						},
						menuList: (styles) => ({
							...styles,
							padding: 0,
							margin: 0,
							borderRadius: 5,
							border: "1px solid var(--borderColor)",
						}),
					}}
					onChange={(newValue) =>
						newValue &&
						handleColorChange(newValue.value as PLAYER_COLOR)
					}
				/>
			</div>

			<div className={styles.latency}>
				<PlayerLatency latency={latency} />
			</div>
			<div
				className={`${styles.kickButton} ${
					!props.hostControls && styles.disabled
				}`}
				onClick={handleKickClick}
			>
				{!props.host && (
					<DynamicImage src={bootKickImg} alt={"bootKick"} />
				)}
			</div>
		</div>
	);
}
