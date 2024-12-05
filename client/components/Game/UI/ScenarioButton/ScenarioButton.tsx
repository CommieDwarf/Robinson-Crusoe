import React, { useEffect, useState } from "react";
import styles from "./ScenarioButton.module.css";

import redArrowImg from "/public/UI/misc/red-arrow.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import { INVENTION_TYPE } from "@shared/types/Game/InventionService/Invention";
import { getObjectsComparator } from "../../../../utils/getObjectsComparator";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";
import { steps } from "components/Game/UITour/steps";

interface Props {
	topLayerElement: string;
	show: boolean;
	toggleShowScenario: () => void;
	goNextUITourStep: () => void;
	UITourStep: number;
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

	const [UIStepTimeout, setUIStepTimeout] = useState<ReturnType<
		typeof setTimeout
	> | null>(null);

	function handleClick() {
		if (UIStepTimeout) {
			return;
		} 
		props.toggleShowScenario();
		if (steps[props.UITourStep]?.target === ".tour-scenario-button") {
			setUIStepTimeout(
				setTimeout(() => {
					props.goNextUITourStep();
                    setUIStepTimeout(null);
				}, 550) // Allow scenario to fully unfold)
			);
		}
	}

	useEffect(() => {
		return () => {
			UIStepTimeout && clearTimeout(UIStepTimeout);
		};
	}, []);

	const rotatedArrowClass = props.show ? styles.arrowRotated : "";

	const { t } = useTranslation();
	return (
		<div
			className={`${styles.container} ${
				topLayer && styles.zIndexIncreased
			} tour-scenario-button`}
		>
			<div className={styles.button} onClick={handleClick}>
				<div className={styles.arrowWrapper}>
					<div className={`${styles.arrow} ${rotatedArrowClass}`}>
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
					<div className={`${styles.arrow} ${rotatedArrowClass}`}>
						<ResizableImage src={redArrowImg} alt="strzałka" />
					</div>
				</div>
			</div>
			)
		</div>
	);
}

export default React.memo(ScenarioButton, getObjectsComparator());
