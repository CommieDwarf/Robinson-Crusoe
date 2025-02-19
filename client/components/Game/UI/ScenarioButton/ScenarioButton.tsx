import React, { useEffect } from "react";
import styles from "./ScenarioButton.module.css";

import redArrowImg from "/public/UI/misc/red-arrow.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import { INVENTION_TYPE } from "@shared/types/Game/InventionService/Invention";
import { getObjectsComparator } from "../../../../utils/getObjectsComparator";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";
import { useUITourControl } from "utils/hooks/useUITourControl";
import { UI_TOUR_STEP_ID } from "types/UITour/UI_TOUR_STEP_ID";
import { UIStateToggled, UIStateUpdated } from "reduxSlices/UITour";

interface Props {
	topLayerElement: string;
}

function ScenarioButton(props: Props) {
	const topLayer = useAppSelector((state) => {
		return selectGame(state)
			?.inventionService.inventions.filter(
				(inv) => inv.inventionType === INVENTION_TYPE.SCENARIO
			)
			.some((inv) => {
				props.topLayerElement.includes(inv.name);
			});
	});

	const currentRound = useAppSelector((state) => {
		return selectGame(state)?.round;
	});

	const dispatch = useAppDispatch();

	const {
		handleNextStep,
		delayInProgress: animationInProgress,
		currentStep,
		cleanupTimeout,
	} = useUITourControl();

	const UIStepsBlockClickList = [
		UI_TOUR_STEP_ID.SCENARIO_INFO,
		UI_TOUR_STEP_ID.SCENARIO,
		UI_TOUR_STEP_ID.SCENARIO_ROUNDS,
	];
	const UIStepsDelayClickList = [
		UI_TOUR_STEP_ID.SCENARIO_BUTTON,
		UI_TOUR_STEP_ID.PRE_MAP_HIDE_SCENARIO,
	];

	function handleClick() {
		if (
			animationInProgress ||
			(currentStep && UIStepsBlockClickList.includes(currentStep.data.id))
		) {
			return;
		}
		dispatch(UIStateToggled("scenarioOpen"));

		if (
			currentStep &&
			UIStepsDelayClickList.includes(currentStep.data.id)
		) {
			handleNextStep();
		}
	}

	useEffect(() => {
		return () => {
			cleanupTimeout();
		};
	}, []);

	const { t } = useTranslation();

	const scenarioOpen = useAppSelector(
		(state) => state.UITour.UiStates.scenarioOpen
	);

	return (
		<div
			className={`${styles.container} ${
				topLayer && styles.zIndexIncreased
			} tour-scenario-button`}
		>
			<div className={styles.button} onClick={handleClick}>
				<div className={styles.arrowWrapper}>
					<div
						className={`${styles.arrow} ${
							scenarioOpen && styles.arrowRotated
						}`}
					>
						<ResizableImage src={redArrowImg} alt="strzałka" />
					</div>
				</div>
				<div className={styles.label}>
					{`${capitalize(
						t("other.scenario", { defaultValue: "scenario" })
					)}:
                     ${capitalize(
							t("scenario.castaways.name", {
								defaultValue: "castaways",
							})
						)}
                      ${capitalize(
							t("other.round", { defaultValue: "round" })
						)}: ${currentRound}`}
				</div>
				<div className={styles.arrowWrapper}>
					<div
						className={`${styles.arrow} ${
							scenarioOpen && styles.arrowRotated
						}`}
					>
						<ResizableImage src={redArrowImg} alt="strzałka" />
					</div>
				</div>
			</div>
			)
		</div>
	);
}

export default React.memo(ScenarioButton, getObjectsComparator());
