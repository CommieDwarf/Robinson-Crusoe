import React from "react";
import styles from "./RestArrange.module.css";
import ActionSlot from "../../ActionSlot";

import moraleArrowRightImg from "/public/UI/icons/morale-arrow-right.png";
import heartImg from "/public/UI/icons/heart.png";
import moraleIconImg from "/public/UI/icons/morale.png";
import { useTranslation } from "react-i18next";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import { ACTION, ACTION_ITEM } from "@shared/types/Game/ACTION";
import { getActionSlotDroppableId } from "@shared/utils/getActionSlotDroppableId";
import { capitalize } from "lodash";
import diagnal from "/public/UI/misc/cross-line.png";
import { insertIconsIntoText } from "utils/insertIconsIntoText/insertIconsIntoText";
import { useAppSelector } from "store/hooks";

interface Props {
	pawnAmount: number;
	type: ACTION.ARRANGE_CAMP | ACTION.REST;
}

export default function RestArrange(props: Props) {
	let rewardLabel;

	const playerAmount = useAppSelector(
		(state) => state.gameSession.data?.players.length
	);

	const shouldChooseReward =
		props.type === ACTION.ARRANGE_CAMP && playerAmount === 4;

	if (props.type === ACTION.ARRANGE_CAMP) {
		rewardLabel = (
			<div
				className={`${styles.actionReward} ${
					styles.arrangeCampReward
				} ${shouldChooseReward && styles.rewardChoice}`}
			>
				{shouldChooseReward && (
					<div className={styles.diagnal}>
						<ResizableImage src={diagnal} alt="" />
					</div>
				)}
				<div
					className={`${styles.actionReward} ${
						styles.arrangeCampReward
					} ${shouldChooseReward && styles.arrangeCampRewardChoice}`}
				>
					<div className={styles.determinationReward}>
						{insertIconsIntoText("2$determination$")}
					</div>
					<div
						className={`${styles.moraleIcon} ${
							shouldChooseReward && styles.moraleIconChoice
						}`}
					>
						{insertIconsIntoText("$morale$")}
					</div>
				</div>
				<div className={styles.moraleReward}>
					<div className={styles.moraleArrow}>
						<ResizableImage
							src={moraleArrowRightImg}
							alt="strzałka morali"
						/>
					</div>
				</div>
			</div>
		);
	} else {
		rewardLabel = (
			<div className={`${styles.actionReward} ${styles.restReward}`}>
				<div className={styles.plus}>+</div>
				<div className={styles.heart}>
					<ResizableImage src={heartImg} alt="serce" />
				</div>
			</div>
		);
	}

	const slotsQuantity = props.pawnAmount == 0 ? 2 : props.pawnAmount + 1;

	const actionSlots = [];

	for (let i = 0; i < slotsQuantity; i++) {
		const id = getActionSlotDroppableId(props.type, "", null, i);
		actionSlots.push(
			<ActionSlot
				type="leader"
				action={props.type}
				uniqueAction={props.type}
				id={id}
				key={id}
			/>
		);
	}

	const [t] = useTranslation();

	return (
		<div className={styles[props.type] + " " + styles.action}>
			<div
				className={`${styles.actionName} ${
					props.type === ACTION.REST ? styles.actionNameRest : ""
				}`}
			>
				{capitalize(t(`action.${props.type}`))
					.split(" ")
					.map((word, index, array) => (
						<React.Fragment key={index}>
							{word}
							{index < array.length - 1 && <br />}
						</React.Fragment>
					))}
			</div>
			{rewardLabel}
			<div className={styles.actionSlots}>
				{actionSlots.map((slot, i) => {
					return (
						<div className={styles.actionSlot} key={i}>
							{slot}
						</div>
					);
				})}
			</div>
		</div>
	);
}
