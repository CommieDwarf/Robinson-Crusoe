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
		backProps,
		closeProps,
		continuous,
		index,
		primaryProps,
		skipProps,
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
				{/* <div className={`${styles.close}`} {...closeProps}>
					<ResizableImage src={xMark} alt="close" />
				</div> */}
			</div>

			<div className={`${styles.content}`}>{step.content}</div>
			<div className={`${styles.footer}`}>
				{/* <div className={`${styles.toolTipButton}`} {...skipProps}>
					{skipProps.title}
					Dalej
				</div> */}
				{/* {index > 0 && (
						<button className="tooltip__button" {...backProps}>
							{backProps.title}
						</button>
					)} */}
				{
					<div className={`${styles.toolTipButton}`} {...closeProps}>
						Zamknij
						{/* {primaryProps.title} */}
					</div>
				}
				{!step.data?.hideNextButton && continuous && (
					<div
						className={`${styles.toolTipButton}`}
						{...primaryProps}
						onClick={props.onNextClick}
					>
						Dalej
						{/* {primaryProps.title} */}
					</div>
				)}
			</div>
		</div>
	);
}
