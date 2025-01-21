import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Phase.module.css";

import PhaseDropDownMenu from "./PhaseDropDownMenu/PhaseDropDownMenu";
import { useTranslation } from "react-i18next";

import triangle from "/public/UI/misc/triangle.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import capitalize from "@shared/utils/capitalize";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";
import { useUITourControl } from "utils/hooks/useUITourControl";
import { UI_TOUR_STEP_ID } from "types/UITour/UI_TOUR_STEP_ID";
import { UIStateToggled } from "reduxSlices/UITour";

export type PhaseType =
	| "production"
	| "night"
	| "preAction"
	| "action"
	| "event"
	| "morale"
	| "weather";

interface Props {
}

function Phase(props: Props) {
	const currentPhase = useAppSelector(
		(state) => selectGame(state)?.phaseService.phase!
	);

	const [containerHeight, setContainerHeight] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (containerRef.current)
			setContainerHeight(containerRef.current.offsetHeight);
	}, []);

	const { handleNextStep, cleanupTimeout, delayInProgress: animationInProgress, currentStep } =
		useUITourControl();


	const stepIdDelayList = [UI_TOUR_STEP_ID.PHASE, UI_TOUR_STEP_ID.PHASE_LIST];

	const dispatch = useAppDispatch();
	function handleClick() {
		if (!animationInProgress) {
			dispatch(UIStateToggled("phaseListOpen"));
			if (currentStep && stepIdDelayList.includes(currentStep.data.id)) {
				handleNextStep();
			}
		}
	}

	const phaseListOpen = useAppSelector((state) => state.UITour.UiStates.phaseListOpen);

	const [t] = useTranslation();

	return (
		<div className={`${styles.container} tour-phase`} ref={containerRef}>
			<strong>
				<span className={`${styles[currentPhase]} ${styles.phaseName}`}>
					{capitalize(
						t(`phase.phase`, {
							phase: currentPhase,
						})
					)}
				</span>
			</strong>
			<div className={styles.phaseIcon}>
				<ResizableImage
					src={`/UI/phase/${currentPhase}.png`}
					fill
					alt="phase icon"
				/>
			</div>
			<div className={styles.dropDownButton} onClick={handleClick}>
				<span className={styles.dropDownText}>
					{capitalize(t("other.order"))}
				</span>
				<div className={styles.triangle}>
					<ResizableImage src={triangle} alt={""} />
				</div>

				{/*<div className={styles.arrowImg}>*/}
				{/*    <ResizableImage src={redArrowImg} alt={""} fill></Image>*/}
				{/*</div>*/}
			</div>
			<PhaseDropDownMenu
				currentPhase={currentPhase}
				show={phaseListOpen}
				rowHeight={containerHeight}
			/>
		</div>
	);
}

export default React.memo(Phase);
