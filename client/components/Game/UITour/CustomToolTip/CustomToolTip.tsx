import { StepMerged, TooltipRenderProps } from "react-joyride";
import styles from "./CustomToolTip.module.css";
import { CustomStep } from "../steps";

interface CustomProps {
	onNextClick?: () => void;
	step: StepMerged & CustomStep;
}

type Props = TooltipRenderProps & CustomProps;

export function CustomTooltip(props: Props) {
	const {
		closeProps,
		continuous,
		primaryProps,
		step,
		tooltipProps,
	} = props;

	return (
		<div
			className={`${styles.body}`}
			{...tooltipProps}
			style={props.step.data.toolTipStyle}
		>
			<div className={styles.topBar}>
				{step.title && (
					<h4 className={`${styles.title}`}>{step.title}</h4>
				)}
			</div>

			<div className={`${styles.content}`}>{step.content}</div>
			<div className={`${styles.footer}`}>
				{
					<div className={`${styles.toolTipButton}`} {...closeProps}>
						Zamknij
					</div>
				}
				{!step.data?.hideNextButton && continuous && (
					<div
						className={`${styles.toolTipButton}`}
						{...primaryProps}
						onClick={props.onNextClick}
					>
						Dalej
					</div>
				)}
			</div>
		</div>
	);
}
