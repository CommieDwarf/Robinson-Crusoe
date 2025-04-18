import {
	CONSTRUCTION,
	IConstructionRenderData,
} from "@shared/types/Game/ConstructionService/Construction";
import { OTHER_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import getActionSlots from "../../getActionSlots";
import { objectsEqual } from "@shared/utils/objectsEqual";
import styles from "./Construction.module.css";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import { CostBlock } from "./CostBlock/CostBlock";
import React from "react";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { selectGame } from "../../../../../reduxSlices/gameSession";
import { socketEmitAction } from "../../../../../middleware/socketMiddleware";
import CommittedResources from "../../CommittedResources/CommittedResources";

type Props = {
	construction: IConstructionRenderData;
};

function Construction(props: Props) {
	const dispatch = useAppDispatch();

	const naturalShelter = useAppSelector((state) => {
		return (
			selectGame(state)?.tileService.campTile.tileResourceService?.extras
				.naturalShelter || false
		);
	});


	const ownedResourcesAmount = useAppSelector((state) => {
		return selectGame(state)?.resourceService.owned.basic;
	});

	const hideActionSlots =
		props.construction.lvl > 0 &&
		props.construction.name === CONSTRUCTION.SHELTER;

	function handleResourceClick(resource: "wood" | "leather") {
		if (
			props.construction.canResourceBeSwitched &&
			props.construction.committedResources?.type !== resource
		) {
			dispatch(
				socketEmitAction(
					OTHER_CONTROLLER_ACTION.SWITCH_COMMITTED_RESOURCES_TYPE,
					props.construction.name
				)
			);
		}
	}

	const { t } = useTranslation();

	let actionSlots;
	if (props.construction.requiredPawnAmount) {
		actionSlots = getActionSlots(
			props.construction,
			props.construction.requiredPawnAmount
		);
	}

	let constrImgName = props.construction.name as string;

	if (
		constrImgName === "shelter" &&
		props.construction.lvl === 0 &&
		naturalShelter
	) {
		constrImgName = "natural-shelter";
	}

	if (!ownedResourcesAmount) return null;
	return (
		<div
			className={`${styles.construction} ${
				props.construction.name === "weapon"
					? styles.noBottomBorder
					: ""
			}`}
		>
			<div className={styles.lvlLabel}>
				{capitalize(t("other.level"))} {props.construction.lvl}
				{props.construction.temporaryBoost > 0 && (
					<span className={styles.lvlBoosted}>
						(+{props.construction.temporaryBoost})
					</span>
				)}
			</div>
			<div className={styles.cost}>
				<CostBlock
					resource1={props.construction.resourceCost}
					resource2={props.construction.optionalResourceCost}
					canBeSwitched={props.construction.canResourceBeSwitched}
					committedResourceType={
						props.construction.committedResources?.type || null
					}
					onClick={handleResourceClick}
					ownedResources={ownedResourcesAmount}
				/>
			</div>
			<div className={styles.build}>
				<div className={styles.actionSlots}>
					{!props.construction.locked && !hideActionSlots && (
						<>{actionSlots}</>
					)}
				</div>
				<div className={styles.committedResources}>
					{props.construction.committedResources && (
						<CommittedResources
							committedResources={
								props.construction.committedResources
							}
							personalResourceUsed={
								props.construction.personalResourceUsed
							}
							background={true}
							justifyContent={"start"}
						/>
					)}
				</div>
			</div>
			<div
				className={`${styles[props.construction.name]} ${
					props.construction.lvl === 0 &&
					constrImgName !== "natural-shelter"
						? styles.level0
						: ""
				}`}
			>
				<DynamicImage
					src={`/UI/constructions/${constrImgName}.webp`}
					fill
					alt={props.construction.name}
				/>
			</div>
			<div className={styles.structureIcon}>
				<DynamicImage
					src={`/UI/constructions/${props.construction.name}-icon.webp`}
					fill
					alt={props.construction.name + " icon"}
				/>
			</div>
		</div>
	);
}

function areEqual(prevProps: Props, nextProps: Props) {
	return objectsEqual(prevProps, nextProps);
}

export default React.memo(Construction, areEqual);
