// @flow
import * as React from "react";
import styles from "./ConfirmCampMove.module.css";
import redArrowImg from "/public/UI/misc/red-arrow.webp";
import DynamicImage from "../../../DynamicImage/DynamicImage";

import { ITileRenderData } from "@shared/types/Game/TileService/ITile";
import { TILE_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";
import { socketEmitAction } from "../../../../middleware/socketMiddleware";

type Props = {
	nextCamp: ITileRenderData;
	hide: () => void;
};
export const ConfirmCampMove = (props: Props) => {
	const currentCamp = useAppSelector(
		(state) => selectGame(state)?.tileService.campTile
	);
	const dispatch = useAppDispatch();

	function handleConfirmClick() {
		dispatch(
			socketEmitAction(
				TILE_CONTROLLER_ACTION.MOVE_CAMP,
				props.nextCamp.id
			)
		);
		props.hide();
	}

	function handleCancelClick() {
		props.hide();
	}

	return (
		<div className={styles.container}>
			<h3>Czy na pewno chcesz przenieść obóz?</h3>
			<div className={styles.tiles}>
				<div className={styles.tile}>
					<DynamicImage
						src={
							"/UI/map/tiles/" +
							currentCamp?.tileResourceService?.id +
							".webp"
						}
						alt={"Obecny obóz"}
						fill
						sizes={styles.tile}
					/>
				</div>
				<div className={styles.arrow}>
					<DynamicImage
						src={redArrowImg}
						alt={"strzałka"}
						fill
						sizes={styles.arrow}
					/>
				</div>
				<div className={styles.tile}>
					<DynamicImage
						src={
							"/UI/map/tiles/" +
							props.nextCamp.tileResourceService?.id +
							".webp"
						}
						alt={"Przyszły obóz"}
						fill
						sizes={styles.tile}
					/>
				</div>
			</div>

			<div className={styles.buttons}>
				<div
					className={styles.button + " " + styles.accept}
					onClick={handleConfirmClick}
				>
					Przenieś
				</div>
				<div
					className={styles.button + " " + styles.cancel}
					onClick={handleCancelClick}
				>
					Anuluj
				</div>
			</div>
		</div>
	);
};
