import { ACTION } from "@shared/types/Game/ACTION";
import { ITileRenderData } from "@shared/types/Game/TileService/ITile";
import React from "react";
import styles from "./ActionSlots.module.css";
import getActionSlots from "../../../getActionSlots";
import { Side } from "@shared/types/Game/TileService/TileResourceService";

const scrollableThreshold = {
	[ACTION.GATHER]: 2,
	[ACTION.EXPLORE]: 4,
};

interface Props {
	tile: ITileRenderData;
}

export function ActionSlots(props: Props) {
	const { requiredPawnAmount } = props.tile;

	const action = props.tile.canBeGathered ? ACTION.GATHER : ACTION.EXPLORE;
	const scrollable = scrollableThreshold[action] <= requiredPawnAmount!;

	return (
		<div className={styles.container}>
			{props.tile.canBeExplored && requiredPawnAmount && (
				<div
					className={`${styles.exploreSlots}
                ${scrollable && styles.scrollable}
                ${scrollable && "preventMapScroll"}`}
				>
					{getActionSlots(props.tile, requiredPawnAmount).map(
						(slot, i) => {
							return (
								<div className={styles.exploreSlot} key={i}>
									{slot}
								</div>
							);
						}
					)}
				</div>
			)}
			{props.tile.canBeGathered &&
				requiredPawnAmount &&
				props.tile.tileResourceService && (
					<div
						className={`${styles.gatherSlotsWrapper} 
                  ${scrollable && styles.scrollable}
                 ${scrollable && "preventMapScroll"}`}
					>
						<div
							className={`${styles.gatherSlots} 
                        ${!scrollable && styles.gatherActionSlotsFew}`}
						>
							{(["left", "right"] as Side[]).map((side, i) => {
								return (
									<div
										className={styles.gatherSlotsColumn}
										key={i}
									>
										{props.tile.tileResourceService
											?.resources[side].canBeGathered &&
											getActionSlots(
												props.tile,
												requiredPawnAmount,
												side
											).map((slot, j) => {
												return (
													<div
														className={
															styles.gatherSlot
														}
														key={j}
													>
														{slot}
													</div>
												);
											})}
									</div>
								);
							})}
						</div>
					</div>
				)}
		</div>
	);
}
