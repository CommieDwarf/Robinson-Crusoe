import ResizableImage from "components/DynamicImage/DynamicImage";
import styles from "./Checkbox.module.css";

interface Props {
	frameNumber?: number;
}

export function CheckBox(
	props: Props & React.InputHTMLAttributes<HTMLInputElement>
) {
	let frameNumber = props.frameNumber;
	if (!frameNumber || frameNumber < 1 || frameNumber > 12) {
		frameNumber = 1;
	}
	return (
		<div
			className={`${styles.container} ${!props.disabled && styles.containerAbled} ${
				props.className && props.className
			}`}
		>
			<div className={styles.inputWrapper}>
				<input type="checkbox" {...props} className={styles.input} />
			</div>
			<div className={styles.frame} aria-hidden="true">
				<ResizableImage
					src={`/UI/scenarios/squares/${frameNumber}.webp`}
					alt="checkbox"
				/>
			</div>
			{props.checked && (
				<div className={styles.checkMark} aria-hidden="true">
					<ResizableImage
						src={"/UI/misc/x-mark.webp"}
						alt="checkmark"
					/>
				</div>
			)}
		</div>
	);
}
