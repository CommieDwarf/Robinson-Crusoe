import styles from "./Health.module.css";
import xMark from "/public/UI/misc/x-mark.webp";

import moraleArrowLeftImg from "/public/UI/icons/morale-arrow-left.webp";
import React from "react";
import DynamicImage from "../../../DynamicImage/DynamicImage";
import { CHARACTER_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { useAppDispatch } from "../../../../store/hooks";
import { socketEmitAction } from "../../../../middleware/socketMiddleware";

interface Props {
	id: number;
	thresholdAmountForRemoval: number;
	removed: boolean;
	vertical?: boolean;
}

export default function Threshold(props: Props) {
	const dispatch = useAppDispatch();

	const blinkClass =
		props.thresholdAmountForRemoval > 0 && !props.removed
			? styles.thresholdMarkedForRemoval
			: "";

	const handleClick = () => {
		if (props.thresholdAmountForRemoval > 0 && !props.removed) {
			dispatch(
				socketEmitAction(
					CHARACTER_CONTROLLER_ACTION.REMOVE_HEALTH_THRESHOLD,
					props.id
				)
			);
		}
	};

	return (
		<div
			className={`${styles.arrowWrapper} ${
				props.vertical && styles.arrowWrapperVertical
			}`}
		>
			<div
				className={`${styles.arrow} ${blinkClass} ${
					props.vertical && styles.arrowVertical
				}`}
				onClick={handleClick}
			>
				<DynamicImage
					src={moraleArrowLeftImg}
					fill
					alt="morale"
					sizes={styles.arrow}
				/>
				{props.removed && (
					<div className={styles.xMark}>
						<DynamicImage src={xMark} alt="usunięty próg" />
					</div>
				)}
			</div>
		</div>
	);
}
