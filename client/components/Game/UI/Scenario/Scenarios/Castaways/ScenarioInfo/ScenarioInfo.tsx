// @flow
import * as React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./ScenarioInfo.module.css";
import { Button } from "./Button/Button";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";
import { castaways } from "@shared/constants/scenarios/castaways";
import Entries from "@shared/types/Entries";
import { ScenarioText } from "@shared/types/Game/ScenarioService/ScenarioService";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";

export const ScenarioInfo = () => {
	const [unrolled, setUnrolled] = useState(false);
	const [buttonClicked, setButtonClicked] = useState("description");

	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	useLayoutEffect(() => {
		if (containerRef.current) {
			setContainerWidth(containerRef.current.offsetWidth);
		}
	}, []);

	function handleButtonClick(button: string) {
		if (button !== buttonClicked) {
			setUnrolled(true);
		} else {
			setUnrolled((prev) => !prev);
		}
		setButtonClicked(button);
	}

	function handleRollClick() {
		setUnrolled((prev) => !prev);
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
		<div className={`${styles.container} tour-scenario-info`} ref={containerRef}>
			<div className={styles.description}>
				<div className={styles.paperImg}>
					<ResizableImage
						src={"/UI/scenarios/scroll.png"}
						alt=""
					/>
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
