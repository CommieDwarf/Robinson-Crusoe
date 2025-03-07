// @flow
import * as React from "react";
import { useState } from "react";
import styles from "./Item.module.css";
import { Tokens } from "./Tokens/Tokens";
import reRollTokenImg from "/public/UI/tokens/reroll.webp";
import ResizableImage from "../../../../../DynamicImage/DynamicImage";
import {
	IResolvableItemRenderData,
	RESOLVE_ITEM_STATUS,
} from "@shared/types/Game/ActionService/IResolvableItem";
import { IBeastRenderData } from "@shared/types/Game/Beasts/Beast";
import { IActionServiceRenderData } from "@shared/types/Game/ActionService/ActionService";
import { ACTION } from "@shared/types/Game/ACTION";
import { IEventCardRenderData } from "@shared/types/Game/EventService/EventCard";
import { IConstruction } from "@shared/types/Game/ConstructionService/Construction";
import { IInventionRenderData } from "@shared/types/Game/InventionService/Invention";
import { ITileRenderData } from "@shared/types/Game/TileService/ITile";
import { kebabCase } from "lodash";
import { ACTION_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { socketEmitAction } from "../../../../../../middleware/socketMiddleware";
import Pawn from "../../../Pawn";
import { CheckBox } from "components/Checkbox/CheckBox";

type Props = {
	resolvableItem: IResolvableItemRenderData;
	resolve: (ResolvableItemID: string) => void;
	locked: boolean;
	rollDices: (resolvableItemID: string) => void;
	reRoll: (resolvableItemID: string) => void;
	actionService: IActionServiceRenderData;
	resolved: boolean;
};
export const Item = (props: Props) => {
	let image;
	let extraInfoDiv;
	let itemTypeStatusClass = "";

	const [used, setUsed] = useState(false);
	const dispatch = useAppDispatch();

	const localPlayer = useAppSelector(
		(state) => state.gameSession.data?.localPlayer!
	);
	const pawnOwner = props.resolvableItem.leaderPawn.owner;
	const isActionAllowed = !(
		"wounds" in pawnOwner && pawnOwner.name !== localPlayer.character?.name
	);

	function handleBibleCheckBoxClick() {
		dispatch(
			socketEmitAction(
				ACTION_CONTROLLER_ACTION.SET_BIBLE_USAGE,
				props.resolvableItem.id,
				!props.resolvableItem.bibleChecked
			)
		);
	}

	if (props.resolvableItem.action === ACTION.THREAT) {
		const card = props.resolvableItem
			.item as unknown as IEventCardRenderData;
		image = (
			<div className={styles.threat}>
				<ResizableImage
					src={`/UI/cards/event/${kebabCase(card.name)}.webp`}
					alt={card.name}
				/>
			</div>
		);
	} else if (props.resolvableItem.action === ACTION.HUNT) {
		const beast = props.resolvableItem.item as unknown as IBeastRenderData;
		image = (
			<div className={styles.hunt}>
				<ResizableImage
					src={`/UI/cards/beasts/${kebabCase(beast.name)}.webp`}
					alt={beast.name}
				/>
			</div>
		);
	} else if (props.resolvableItem.droppableID.includes("invention")) {
		const invention = props.resolvableItem
			.item as unknown as IInventionRenderData;
		const reverse =
			invention.isBuilt && invention.inventionType !== "scenario"
				? "-reverse"
				: "";
		image = (
			<div className={styles.invention}>
				<ResizableImage
					src={`/UI/inventions/${invention.inventionType}/${kebabCase(
						invention.name
					)}${reverse}.webp`}
					alt={invention.name}
				/>
			</div>
		);
	} else if (props.resolvableItem.droppableID.includes("construction")) {
		itemTypeStatusClass = styles.constructionStatus;
		const construction = props.resolvableItem
			.item as unknown as IConstruction;
		image = (
			<div
				className={
					styles[construction.name] + " " + styles.construction
				}
			>
				<ResizableImage
					src={`/UI/constructions/${kebabCase(
						construction.name
					)}.webp`}
					alt={construction.name}
				/>
			</div>
		);
		extraInfoDiv = (
			<div className={styles.structureLvl}>
				<span className={styles.currentLvl + " " + styles.lvl}>
					{construction.lvl}
					<span className={styles.lvlSpan}>lvl</span>
				</span>
			</div>
		);
	} else if (
		props.resolvableItem.action === ACTION.GATHER ||
		props.resolvableItem.action === ACTION.EXPLORE
	) {
		const tile = props.resolvableItem.item as unknown as ITileRenderData;
		itemTypeStatusClass = styles.tileStatus;
		const id =
			tile.tileResourceService?.id != null &&
			(props.resolved || props.resolvableItem.action === ACTION.GATHER)
				? tile.tileResourceService.id
				: 11;

		image = (
			<div className={styles.tile}>
				<ResizableImage
					src={`/UI/map/tiles/${id}.webp`}
					alt={"kafelek"}
				/>
			</div>
		);
		if (props.resolvableItem.action === ACTION.GATHER) {
			const side = props.resolvableItem.droppableID.includes("left")
				? "left"
				: "right";
			extraInfoDiv = (
				<div className={styles.gather}>
					<span className={styles.gatherAmount}>1</span>
					<div className={styles.resourceIcon}>
						<ResizableImage
							src={`/UI/resources/${tile.tileResourceService?.resources[side].resource}.webp`}
							alt={"surowiec"}
						/>
					</div>
				</div>
			);
		}
	} else {
		image = (
			<div className={styles.restArrange}>
				<ResizableImage
					src={`/UI/actions/${kebabCase(
						props.resolvableItem.action
					)}-picture.webp`}
					alt={props.resolvableItem.action}
				/>
			</div>
		);
	}

	function handleClick() {
		if (used || props.locked || !isActionAllowed) {
			return;
		}

		if (props.resolvableItem.shouldReRollSuccess) {
			props.reRoll(props.resolvableItem.id);
		} else if (
			props.resolvableItem.shouldRollDices &&
			props.resolvableItem.resolveStatus === RESOLVE_ITEM_STATUS.PENDING
		) {
			props.rollDices(props.resolvableItem.id);
		} else {
			props.resolve(props.resolvableItem.id);
			setUsed(true);
		}
	}

	const lockedButtonClass =
		used ||
		props.locked ||
		!isActionAllowed ||
		props.resolvableItem.resolveStatus !== RESOLVE_ITEM_STATUS.PENDING
			? styles.locked
			: styles.clickableButton;
	const statusClass =
		props.resolvableItem.resolveStatus === RESOLVE_ITEM_STATUS.SUCCESS
			? styles.success
			: styles.failure;

	const action = props.resolvableItem.action;
	let buttonText: string | (JSX.Element | string)[];
	if (props.resolvableItem.shouldReRollSuccess && !props.locked) {
		buttonText = [
			"Przerzuć",
			<div className={styles.reRollToken} key={"1"}>
				<ResizableImage src={reRollTokenImg} alt={"przerzut sukcesu"} />
			</div>,
		];
	} else if (props.resolvableItem.shouldRollDices) {
		buttonText = "Rzuć kośćmi";
	} else {
		buttonText = "Wykonaj";
	}

	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<Tokens
					action={action}
					reRollTokens={props.actionService.reRollTokens}
					adventureTokens={props.actionService.adventureTokens}
				/>
				{image}
				{extraInfoDiv}
			</div>

			{props.resolved && (
				<div
					className={`${styles.status} ${itemTypeStatusClass} ${statusClass}`}
				>
					{props.resolvableItem.resolveStatus ===
					RESOLVE_ITEM_STATUS.FAILURE
						? "Porażka!"
						: "Sukces!"}
				</div>
			)}
			{(props.resolvableItem.canBibleBeUsed ||
				props.resolvableItem.bibleChecked) && (
				<div className={styles.itemUseCheckBox}>
					<div>Użyć Biblii?</div>
					<CheckBox
						checked={props.resolvableItem.bibleChecked}
						onClick={handleBibleCheckBoxClick}
					/>
				</div>
			)}
			<div
				className={`${styles.resolveButton} ${lockedButtonClass}`}
				onClick={handleClick}
			>
				{buttonText}
			</div>
			<div className={styles.character}>
				<Pawn
					pawn={props.resolvableItem.leaderPawn}
					context={"other"}
					index={0}
					disabled={true}
				/>
			</div>
		</div>
	);
};
