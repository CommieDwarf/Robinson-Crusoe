import React from "react";
import styles from "./PhaseDropDownMenu.module.css";
import { useTranslation } from "react-i18next";

import { PhaseType } from "../Phase";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import { capitalize } from "lodash";

interface Props {
	currentPhase: PhaseType;
	show: boolean;
	rowHeight: number;
}

export default function PhaseDropDownMenu(props: Props) {
	const [t] = useTranslation();

	const phases: PhaseType[] = [
		"event",
		"morale",
		"production",
		"action",
		"weather",
		"night",
	];
	const currentPhase =
		props.currentPhase === "preAction" ? "action" : props.currentPhase;

	const phaseElements = phases.map((phase, i) => {
		const currentPhaseClass =
			currentPhase === phase ? styles.currentPhase : "";

		const phaseStyle = {
			height: props.rowHeight + "px",
		};
		return (
			<div
				className={`${styles.phase} ${currentPhaseClass} ${
					phase === "night" ? styles.last : ""
				}`}
				key={i}
				style={phaseStyle}
			>
				<div className={`${styles.phaseLabel} ${styles[phase]}`}>
					{i + 1}.{" "}
					{capitalize(
						t(`phase.phase`, {
							phase: phase,
						})
					)}
				</div>
				<div className={styles.phasePicture}>
					<DynamicImage
						src={`/UI/phase/${phase}-pic.webp`}
						alt={phase}
					/>
				</div>
			</div>
		);
	});
	const contentStyle = {
		height: props.rowHeight * 6 + "px",
	};
	return (
		<div
			className={`${styles.container} tour-phase-list`}
			style={props.show ? contentStyle : { height: 0 }}
		>
			<div className={styles.content} style={contentStyle}>
				{phaseElements}
			</div>
		</div>
	);
}
