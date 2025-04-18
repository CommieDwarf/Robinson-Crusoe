import React from "react";
import ActionSlot from "../../../../ActionSlot";
import styles from "./Invention.module.css";
import getActionSlots from "../../../../getActionSlots";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../../../../store/hooks";
import DynamicImage from "../../../../../../DynamicImage/DynamicImage";
import { kebabCase } from "lodash";
import { OTHER_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { ACTION } from "@shared/types/Game/ACTION";
import {
	IInventionRenderData,
	INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import { getOwnedDroppableId } from "@shared/utils/getOwnedDroppableId";
import { getObjectsComparator } from "../../../../../../../utils/getObjectsComparator";
import { selectGame } from "../../../../../../../reduxSlices/gameSession";
import { socketEmitAction } from "../../../../../../../middleware/socketMiddleware";
import CommittedResources from "../../../../CommittedResources/CommittedResources";
import buildIconImg from "/public/UI/actionSlots/build.webp";

type Props = {
	invention: IInventionRenderData;
	hideActionSlots?: boolean;
	handleMouseOverButtons: (value: boolean) => void;
};

function Invention(props: Props) {
	const dispatch = useAppDispatch();

	function handleMouseEnter() {
		props.handleMouseOverButtons(true);
	}

	function handleMouseLeave() {
		props.handleMouseOverButtons(false);
	}

	function handleUseButtonClick() {
		dispatch(
			socketEmitAction(
				OTHER_CONTROLLER_ACTION.USE_INVENTION,
				props.invention.name
			)
		);
		props.handleMouseOverButtons(false);
	}

	const resources: JSX.Element[] = [];
	const resource = props.invention.committedResources?.type;
	if (resource && props.invention.committedResources?.amount) {
		for (let i = 0; i < props.invention.committedResources?.amount; i++) {
			resources.push(
				<div className={styles.resource} key={i}>
					<DynamicImage
						src={`/UI/resources/${resource}.webp`}
						alt="surowiec"
					/>
				</div>
			);
		}
	}

	const state = useAppSelector(
		(state) => selectGame(state)?.actionService.globalCostModifiers
	);

	const modifiers = state && state[ACTION.BUILD];
	const extraPawnNeeded = modifiers?.some((mod) => mod.resource === "helper")
		? 1
		: 0;

	const players = useAppSelector((state) => selectGame(state)?.players);

	if (!players) return null;

	let color: string | undefined;
	if (props.invention.inventionType === INVENTION_TYPE.PERSONAL) {
		color = players.find(
			(player) => player.character?.invention === props.invention.name
		)?.color;
	}
	const style: React.CSSProperties = {
		boxShadow: `inset 0px 0px 5px 2px ${color}`,
	};

	if (!state) return null;
	return (
		<div className={`${styles.container} `}>
			<div className={styles.boxShadowOverlay} style={style}></div>

			<DynamicImage
				src={`/UI/inventions/${
					props.invention.inventionType
				}/${kebabCase(props.invention.name)}${
					props.invention.isBuilt ? "-reverse" : ""
				}.webp`}
				alt={"karta pomysłu"}
			/>
			{color && (
				<div
					className={`${styles.personalColorMark} ${
						props.invention.isBuilt && styles.personalColorMarkBuilt
					}`}
					style={{ backgroundColor: color }}
				>
					<DynamicImage src={buildIconImg} alt={"build"} />
				</div>
			)}

			{!props.invention.isBuilt &&
				!props.invention.locked &&
				!props?.hideActionSlots && (
					<div className={styles.actionSlots}>
						{getActionSlots(props.invention, extraPawnNeeded)}
					</div>
				)}

			<div className={styles.committedResources}>
				{props.invention.committedResources && (
					<CommittedResources
						committedResources={props.invention.committedResources}
						personalResourceUsed={
							props.invention.personalResourceUsed
						}
						background={true}
						justifyContent={"center"}
					/>
				)}
			</div>
			{props.invention.isBuilt && props.invention.canBeUsed && (
				<div
					className={`${styles.useButton}`}
					onClick={handleUseButtonClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					Użyj
				</div>
			)}

			{props.invention.inventionType === INVENTION_TYPE.SCENARIO && (
				<div className={styles.scenarioIcon}>
					<DynamicImage
						src={"/UI/icons/scenario.webp"}
						alt="scenario"
					/>
				</div>
			)}

			<div className={`${styles.cardPawn} `}>
				{props.invention.pawnService.pawns.map((pawn) => {
					return (
						<ActionSlot
							type={"helper"}
							key={pawn.draggableId}
							action={ACTION.EXPLORE}
							uniqueAction={ACTION.EXPLORE}
							id={getOwnedDroppableId(
								pawn.owner.name,
								"invention"
							)}
							ownedByCard={true}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default React.memo(Invention, getObjectsComparator([]));
