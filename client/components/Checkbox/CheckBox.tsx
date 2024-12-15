import ResizableImage from "components/ResizableImage/ResizableImage";
import styles from "./Checkbox.module.css";

interface Props {
	type?: number;
	checked?: boolean;
	onClick?: (event?: React.MouseEvent) => void;
	className?: string;
}

export function CheckBox(props: Props) {
	let type = props.type;
	if (!type || type < 1 || type > 12) {
		type = 1;
	}
	return (
		<div
			className={`${styles.container} ${
				props.className ? props.className : styles.defaultSize
			}`}
            onClick={props.onClick}
		>
			<div className={styles.frame}>
				<ResizableImage
					src={`/UI/scenarios/squares/${type}.png`}
					alt="checkbox"
				/>
			</div>
			{props.checked && (
				<div className={styles.checkMark}>
					<ResizableImage
						src={"/UI/misc/x-mark.png"}
						alt="checkmark"
					/>
				</div>
			)}
		</div>
	);
}
