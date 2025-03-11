// @flow
import * as React from "react";
import { useRef, useState } from "react";
import styles from "./ScenarioInfo.module.css";
import { Button } from "./Button/Button";
import DynamicImage from "../../../../../../DynamicImage/DynamicImage";
import { castaways } from "@shared/constants/scenarios/castaways";
import Entries from "@shared/types/Entries";
import { ScenarioText } from "@shared/types/Game/ScenarioService/ScenarioService";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";

export const ScenarioInfo = () => {
	const [buttonClicked, setButtonClicked] = useState("description");

	const containerRef = useRef<HTMLDivElement>(null);

	function handleButtonClick(button: string) {
		setButtonClicked(button);
	}
	const buttons: JSX.Element[] = [];

	const textEntries = Object.entries(castaways.text) as Entries<ScenarioText>;

	const { t } = useTranslation();

	textEntries.forEach(([key, value], i) => {
		buttons.push(
			<Button
				buttonText={key}
				selected={buttonClicked === key}
				text={value}
				buttonClick={handleButtonClick}
				key={i}
			/>
		);
	});
	return (
		<div
			className={`${styles.container} tour-scenario-info`}
			ref={containerRef}
		>
			<div className={styles.description}>
				<div className={styles.paperImg}>
					<DynamicImage src={"/UI/scenarios/scroll.webp"} alt="" />
				</div>
				<div className={styles.text}>
					{/* @ts-ignore */}

					<h4>{capitalize(t(`other.${buttonClicked}`))}</h4>

					<p className={styles.p}>
						{/*@ts-ignore*/}
						{t(`scenario.castaways.${buttonClicked}`)}
					</p>
				</div>
			</div>
			<div className={styles.buttons}>{buttons}</div>
		</div>
	);
};
