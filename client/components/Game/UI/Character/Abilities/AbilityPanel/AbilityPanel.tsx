import React, { useState } from "react";
import styles from "./AbilityPanel.module.css";
import snowImg from "/public/UI/scenarios/snow.webp";
import rainImg from "/public/UI/scenarios/rain.webp";
import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import { insertIconsIntoText } from "../../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import { ABILITY } from "@shared/types/Game/Skill/ABILITY";
import { CHARACTER_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { DisplayedAbilityInfo } from "../../Character";
import { selectGame } from "../../../../../../reduxSlices/gameSession";
import { socketEmitAction } from "../../../../../../middleware/socketMiddleware";
import { toast } from "react-toastify";
import { StyledHr } from "components/StyledHr/StyledHr";

interface Props {
	abilityInfo: DisplayedAbilityInfo;
	used: boolean;
	width: number;
	ownedDetermination: number;
}

export default function AbilityPanel(props: Props) {
	const { t } = useTranslation();
	const localCharacter = useAppSelector(
		(state) => state.gameSession.data!.localPlayer.character!
	);

	const overallWeather = useAppSelector(
		(state) => selectGame(state)?.weatherService.overallWeather
	);

	let description;
	let comment;
	if (props.abilityInfo.ability) {
		// @ts-ignore
		description = t(
			`ability.${props.abilityInfo.ability.name}.description`
		) as string;
		comment = t(
			// @ts-ignore
			`ability.${props.abilityInfo.ability.name}.comment`
		) as string;
		description = insertIconsIntoText(description, styles.icon);
		comment = insertIconsIntoText(comment, styles.icon);
	}

	const [cloud, setCloud] = useState<"rain" | "snow">("rain");

	if (
		overallWeather &&
		overallWeather.rain === 0 &&
		overallWeather.snow > 0 &&
		cloud === "rain"
	) {
		setCloud("snow");
	}

	function handleRainCloudClick() {
		if (!overallWeather) {
			return;
		}
		if (overallWeather.rain > 0 && cloud !== "rain") {
			setCloud("rain");
		}
	}

	function handleSnowCloudClick() {
		if (!overallWeather) {
			return;
		}
		if (overallWeather.snow > 0 && cloud !== "snow") {
			setCloud("snow");
		}
	}

	const dispatch = useAppDispatch();

	function handleButtonClick() {
		if (props.abilityInfo.ability.cost > props.ownedDetermination) {
			toast(
				capitalize(t("alerts.not enough determination for ability")),
				{
					type: "error",
				}
			);
		}

		const ability = props.abilityInfo.ability.name as ABILITY;
		activateAbility(ability);
	}

	function activateAbility(abilityName: ABILITY) {
		let target;
		if (abilityName === ABILITY.HOOCH) {
			target = cloud;
		}
		dispatch(
			socketEmitAction(
				CHARACTER_CONTROLLER_ACTION.USE_ABILITY,
				localCharacter.name,
				abilityName,
				target
			)
		);
	}

	const containerStyle = {
		width: props.width + "px",
	};

	if (overallWeather === undefined) return null;
	return (

			<div className={styles.container} style={containerStyle}>
				{props.abilityInfo.ability && (
					<>
						<div className={styles.topBar}>
							<div className={styles.abilityName}>
								{/*@ts-ignore*/}
								{t(
									`ability.${props.abilityInfo.ability.name}.name`
								)}
							</div>
						</div>

						<div className={styles.text}>
							<div className={styles.quote}>{comment}</div>
							<StyledHr />
							<div className={styles.description}>
								{description}
							</div>
						</div>
						{!props.used && props.abilityInfo.ability.canBeUsed && (
							<>
								{props.abilityInfo.ability.name === "hooch" && (
									<div className={styles.chooseCloud}>
										<div
											className={`${styles.cloud} ${
												cloud === "rain"
													? styles.cloudSelected
													: ""
											}`}
											onClick={handleRainCloudClick}
										>
											<DynamicImage
												src={rainImg}
												alt={"deszcz"}
												fill
												sizes={styles.cloud}
											/>
										</div>
										/
										<div
											className={`${styles.cloud} ${
												cloud === "snow"
													? styles.cloudSelected
													: ""
											}`}
											onClick={handleSnowCloudClick}
										>
											<DynamicImage
												src={snowImg}
												alt={"śnieg"}
												fill
												sizes={styles.cloud}
											/>
										</div>
									</div>
								)}
								<div
									className={styles.useButton}
									onClick={handleButtonClick}
								>
									{capitalize(t("other.use"))}
								</div>
							</>
						)}
						{props.used && (
							<>
								<div
									className={`${styles.useButton} ${styles.useButtonUsed}`}
								>
									Użyto w tej rundzie
								</div>
							</>
						)}
					</>
				)}
			</div>
	);
}
