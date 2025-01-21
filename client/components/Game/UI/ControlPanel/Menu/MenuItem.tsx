import ResizableImage from "components/ResizableImage/ResizableImage";
import styles from "./MenuItem.module.css";
import { StaticImageData } from "next/image";
import { CSSProperties } from "react";
import { StyledHr } from "components/StyledHr/StyledHr";

interface Props {
	button: JSX.Element;
	label: string;
	style?: CSSProperties;
    onClick?: () => void;
	className?: string;
}

export function MenuItem(props: Props) {
	return (
		<div className={`${styles.container} ${props.className}`} style={props.style} onClick={props.onClick}>
			<div className={styles.contentWrapper}>
				<div className={styles.button}>{props.button}</div>
				<div className={styles.menuText}>{props.label}</div>
			</div>
		</div>
	);
}
