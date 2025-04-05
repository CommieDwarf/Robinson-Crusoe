import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Phase.module.css";

import { useTranslation } from "react-i18next";

import triangle from "/public/UI/misc/triangle.webp";
import DynamicImage from "../../../DynamicImage/DynamicImage";
import capitalize from "@shared/utils/capitalize";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";
import { useUITourControl } from "utils/hooks/useUITourControl";
import { UI_TOUR_STEP_ID } from "types/UITour/UI_TOUR_STEP_ID";
import { UIStateToggled } from "reduxSlices/UITour";
import DropdownMenu from "components/DropDownMenu/DropDownMenu";
import { PhaseElement } from "./PhaseList/PhaseElement";

export type PhaseType =
	| "production"
	| "night"
	| "preAction"
	| "action"
	| "event"
	| "morale"
	| "weather";

const phases: PhaseType[] = [
	"event",
	"morale",
	"production",
	"action",
	"weather",
	"night",
];

function Phase() {
	const currentPhase = useAppSelector(
		(state) => selectGame(state)!.phaseService.phase
	);

	const containerRef = useRef<HTMLDivElement>(null);

	const [containerHeight, setContainerHeight] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		if (!containerRef.current) return;

		const resizeObserver = new ResizeObserver(() => {
			if (!containerRef.current) {
				return;
			}
			setContainerHeight(containerRef.current.offsetHeight);
			setContainerWidth(containerRef.current?.offsetWidth);
		});

		resizeObserver.observe(containerRef.current);

		return () => resizeObserver.disconnect(); // clean up 
	  }, []);

	const {
		handleNextStep,
		delayInProgress: animationInProgress,
		currentStep,
	} = useUITourControl();

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

	const phaseListOpen = useAppSelector(
		(state) => state.UITour.UiStates.phaseListOpen
	);

	const [t] = useTranslation();

	const mapContainer = document.getElementById("map");

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
				<DynamicImage
					src={`/UI/phase/${currentPhase}.webp`}
					fill
					alt="phase icon"
				/>
			</div>
			<div className={styles.dropDownButton} onClick={handleClick}>
				<span className={styles.dropDownText}>
					{capitalize(t("other.order"))}
				</span>
				<div className={styles.triangle}>
					<DynamicImage src={triangle} alt={""} />
				</div>
			</div>

			{mapContainer && (
				<DropdownMenu
					isOpen={phaseListOpen}
					size={{
						width: containerWidth + "px",
						height: (containerHeight + 5) * 6 + "px",
					}}
					direction={"bottom"}
					root={mapContainer}
				>
					<div className={`${styles.phaseList} tour-phase-list`}>
						{phases.map((phase, i) => {
							return (
								<PhaseElement
									currentPhase={
										currentPhase === phase ||
										(currentPhase === "preAction" &&
											phase === "action")
									}
									phase={phase}
									i={i}
									key={i}
									height={containerHeight + 5}
								/>
							);
						})}
					</div>
				</DropdownMenu>
			)}
		</div>
	);
}

export default React.memo(Phase);
