// @flow
import * as React from "react";

import styles from "./WoodPile.module.css";
import fireImg from "/public/UI/scenarios/fire.webp";
import woodImg from "/public/UI/resources/wood.webp";
import ResizableImage from "../../../../../../DynamicImage/DynamicImage";
import { OTHER_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../../../../store/hooks";
import { selectGame } from "../../../../../../../reduxSlices/gameSession";
import { socketEmitAction } from "../../../../../../../middleware/socketMiddleware";

export const WoodPile = () => {
	const scenarioService = useAppSelector(
		(state) => selectGame(state).scenarioService
	);

	const dispatch = useAppDispatch();

	function handleButtonClick() {
		dispatch(socketEmitAction(OTHER_CONTROLLER_ACTION.ADD_WOOD_TO_PILE));
	}


	return (
		<div className={styles.container}>
			<div className={styles.frame}>
				<ResizableImage src={"/UI/scenarios/square-frame.webp"} alt="" />
			</div>
			<div className={styles.woodPileLvl}>
				{scenarioService.woodStashLvl}/5
			</div>
			<div
				className={`${styles.fire} ${!scenarioService.isFireBuilt && styles.fireNotBuilt
					}`}
			>
				<ResizableImage
					src={fireImg}
					fill
					alt={"ogień"}
					sizes={styles.fire}
				/>
			</div>
			<div
				className={`${styles.woodStack} ${styles["level" + scenarioService.woodStashLvl]
					}`}
			>
				<ResizableImage
					src={`/UI/scenarios/castaways/woodStack${scenarioService.woodStashLvl}.webp`}
					fill
					sizes={styles.woodStack}
					alt={"stos drewna"}
				/>
			</div>

			{scenarioService.woodStashLvl < 5 && (
				<div className={styles.wood}>
					<div className={styles.woodAmount}>
						{scenarioService.committedWood}/
						{scenarioService.woodStashLvl}
						<div className={styles.woodImage}>
							<ResizableImage
								src={woodImg}
								fill
								alt={"drewno"}
								sizes={styles.woodImage}
							/>
						</div>
					</div>

					{scenarioService.woodStashLvl < 5 && (
						<div
							className={`${styles.woodButton} ${styles.addWoodButton
								} 
							
							${scenarioService.canAddWood && styles.buttonActive}`}
							onClick={handleButtonClick}
						>
							Odłóż
						</div>
					)}
				</div>
			)}
		</div>
	);
};
