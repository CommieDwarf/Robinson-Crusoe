import dynamic from "next/dynamic";
import { useEffect } from "react";

import styles from "./UITour.module.css";
import { CustomTooltip } from "./CustomToolTip/CustomToolTip";
import { steps } from "./steps";
import { useAppSelector } from "store/hooks";
import { useUITourControl } from "utils/hooks/useUITourControl";

interface Props {}

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });
export function UITour(props: Props) {
	const run = useAppSelector((state) => state.UITour.tourInProgress);
	const stepIndex = useAppSelector((state) => state.UITour.stepIndex);
	const { cleanupTimeout, handleNextStep } = useUITourControl();
	
	function handleNextClick() {
		handleNextStep();
	}

	useEffect(() => {
		return () => {
			cleanupTimeout();
		};
	}, []);

	return (
		<div className={styles.container}>
			<JoyRideNoSSR
				steps={steps}
				stepIndex={stepIndex}
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
				continuous
				tooltipComponent={(props) => (
					//@ts-ignore
					<CustomTooltip {...props} onNextClick={handleNextClick} />
				)}
				disableOverlayClose={true}
				spotlightClicks={true}
			/>
		</div>
	);
}
