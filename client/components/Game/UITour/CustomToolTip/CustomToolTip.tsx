import Joyride, { TooltipRenderProps } from "react-joyride";
import styles from "./CustomToolTip.module.css";
import ResizableImage from "components/ResizableImage/ResizableImage";
import xMark from "../../../../public/UI/misc/x-mark.png";

interface Props {
	onNextClick: () => void;
}

export function CustomTooltip(props: TooltipRenderProps & Props, style: StyleSheet) {
	const {
		backProps,
		closeProps,
		continuous,
		index,
		primaryProps,
		skipProps,
		step,
		tooltipProps,
		onNextClick
	} = props;

	const hideNextButtonTargets: any[] = [".tour-scenario-button"];



	return (
		<div className={`${styles.body}`} {...tooltipProps}>
			<div className={styles.topBar}>
				{step.title && (
					<h4 className={`${styles.title}`}>{step.title}</h4>
				)}
				<div className={`${styles.close}`} {...closeProps}>
					<ResizableImage src={xMark} alt="close" />
				</div>
			</div>

			<div className={`${styles.content}`}>{step.content}</div>
			<div className={`${styles.footer}`}>
				{/* <div className={`${styles.toolTipButton}`} {...skipProps}>
					{skipProps.title}
					Dalej
				</div> */}
				<div className="tooltip__spacer">
					{/* {index > 0 && (
						<button className="tooltip__button" {...backProps}>
							{backProps.title}
						</button>
					)} */}
					{!hideNextButtonTargets.includes(step.target)  && continuous && (
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
		</div>
	);
}
