import styles from "./ReadyButton.module.css";
import ResizableImage from "../ResizableImage/ResizableImage";
import circleImg from "/public/UI/misc/black-circle.png";
import checkMark from "/public/UI/misc/check-mark.png";
import xMarkImg from "/public/UI/misc/x-mark.png";

interface Props {
	ready: boolean;
	onClick?: () => void;
	disabled: boolean;
}

export function ReadyButton(props: Props) {
	function handleClick() {
		props.onClick && props.onClick();
	}

	return (
		<div
			className={`${styles.container} ${props.ready && styles.ready}`}
			onClick={handleClick}
		>
			<div className={`${styles.readyImg}`}>
				{props.ready && (
					<ResizableImage src={checkMark} alt={"ready"} />
				)}
				{!props.ready && (
					<ResizableImage src={xMarkImg} alt={"not ready"} />
				)}
			</div>
			<div
				className={`${styles.circle} ${
					!props.ready && styles.notReady
				}`}
			>
				<ResizableImage src={circleImg} alt={"ready"} />
			</div>
		</div>
	);
}
