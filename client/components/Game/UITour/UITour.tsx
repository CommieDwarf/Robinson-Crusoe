import ReactJoyride from "react-joyride";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import styles from "./UITour.module.css";
import { CustomTooltip } from "./CustomToolTip/CustomToolTip";
import { insertIconsIntoText } from "utils/insertIconsIntoText/insertIconsIntoText";
import toolTipStyles from "./CustomToolTip/CustomToolTip.module.css";
import { Step } from "react-joyride";
import { steps } from "./steps";

interface Props {
	setNextStep: () => void;
	step: number;
}

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });
export function UITour(props: Props) {
	const [run, setRun] = useState(true);
	
	function handleNextClick() {
		props.setNextStep();
	}
0
	return (
		<div className={styles.container}>
			<JoyRideNoSSR
				steps={steps}
				stepIndex={props.step}
				
				run={run}
				debug={true}
				floaterProps={{
					styles: {
						wrapper: {
							zIndex: 1000,
						},
					},
				}}
				styles={{
					options: {
						zIndex: 1000,
					},
				}}
				callback={(data) => {
					const { status } = data;

					const finishedStatuses = ["finished, skipped"];
					if (finishedStatuses.includes(status)) {
						setRun(false);
						setTimeout(() => setRun(true), 1);
					}
				}}
				continuous
				tooltipComponent={(props) => <CustomTooltip { ...props} onNextClick={handleNextClick}/>}
			/>
		</div>
	);
}
