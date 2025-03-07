import styles from "./Button.module.css";
import ResizableImage from "../../../../DynamicImage/DynamicImage";
import { StaticImageData } from "next/image";
import { CSSProperties } from "react";

export interface Props {
	onClick?: () => void;
	imgSrc: string | StaticImageData;
	border?: boolean;
	blackToBrownFilter?: boolean;
	filter?: string;
	style?: CSSProperties;
    scaleOnHover?: boolean
}

export function Button(props: Props) {
	function handleClick() {
		props.onClick && props.onClick();
	}

	return (
		<div
			className={`${styles.container} ${
				!props.border && styles.containerBorderless
			} ${props.scaleOnHover && styles.scaleOnHover}`}
			style={props.style}
			onClick={handleClick}
		>
			<div
				className={`${styles.imgWrapper} ${
					props.blackToBrownFilter && styles.blackToBrown
				}`}
				style={props.filter ? { filter: props.filter} : {} }
			>
				<ResizableImage src={props.imgSrc} alt={"button"} />
			</div>
		</div>
	);
}
