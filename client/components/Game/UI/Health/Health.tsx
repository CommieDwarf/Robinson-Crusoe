import React from "react";
import styles from "./Health.module.css";
import heartImg from "/public/UI/misc/heart.webp";
import redHeartImg from "/public/UI/icons/red-heart.webp";
import skullImg from "/public/UI/icons/skull.webp";
import Threshold from "./Threshold";
import DynamicImage from "../../../DynamicImage/DynamicImage";
import { getObjectsComparator } from "../../../../utils/getObjectsComparator";
import { useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";

interface Props {
	vertical?: boolean;
	background: boolean;
	moraleThresholds: number[];
	maxHealth: number;
	health: number;
	moraleThresholdsRemoved?: number[];
}

function Health(props: Props) {
	const icons: JSX.Element[] = [];
	const characterService = useAppSelector(
		(state) => selectGame(state)!.characterService
	);

	for (let i = props.maxHealth; i > 0; i--) {
		icons.push(
			<div
				className={`${
					props.vertical ? styles.iconVertical : styles.icon
				} ${props.vertical && styles.verticalWrapper}`}
				key={i}
			>
				<DynamicImage
					src={i === props.health ? redHeartImg : heartImg}
					fill
					alt="serce"
				/>
			</div>
		);
		if (
			props.moraleThresholdsRemoved &&
			props.moraleThresholds.includes(i - 1)
		) {
			icons.push(
				<Threshold
					id={i - 1}
					thresholdAmountForRemoval={
						characterService.thresholdAmountForRemoval
					}
					removed={props.moraleThresholdsRemoved.includes(i - 1)}
					key={i + 100}
					vertical={props.vertical}
				/>
			);
		}
	}
	icons.push(
		<div
			className={`${props.vertical ? styles.iconVertical : styles.icon} ${
				props.vertical && styles.verticalWrapper
			}`}
			key={2137}
		>
			<DynamicImage src={skullImg} alt="śmierć" />
		</div>
	);
	return (
		<div
			className={`${styles.container} ${
				props.background && styles.containerBackground
			} health`}
		>
			<div
				className={`${styles.health} ${
					props.vertical && styles.healthVertical
				}`}
			>
				{icons}
			</div>
		</div>
	);
}

export default React.memo(Health, getObjectsComparator());
