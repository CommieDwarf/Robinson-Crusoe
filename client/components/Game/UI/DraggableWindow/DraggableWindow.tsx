import styles from "./DraggableWindow.module.css";
import Draggable from "react-draggable";
import sharedStyles from "../../../../styles/shared.module.css";
import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import DynamicImage from "../../../DynamicImage/DynamicImage";
import xMark from "/public/UI/misc/x-mark.webp";

interface Props {
	width?: number | string;
	height?: number | string;
	children?: string | JSX.Element | JSX.Element[];
	padding?: string | number;
	onClose?: () => void;
	topLayer?: boolean;
	showOverflow?: boolean;
	styles?: CSSProperties;
}

export function DraggableWindow(props: Props) {
	const [containerSize, setContainerSize] = useState({
		x: props.width || 0,
		y: props.height || 0,
	});

	const containerRef = useRef<HTMLDivElement>(null);

	const defaultUnit = "px";

	function addUnit(size: string | number): string {
		return typeof size === "string" ? size : size + defaultUnit;
	}

	const propSizeWithUnit = {
		width: props.width && addUnit(props.width),
		height: props.height && addUnit(props.height),
	};

	const style: React.CSSProperties = {
		padding: props.padding,
		width: propSizeWithUnit.width && propSizeWithUnit.width,
		height: propSizeWithUnit.height && propSizeWithUnit.height,
		...props.styles,
	};

	if (containerSize.x && containerSize.y) {
		style.top = `calc(50% - ${addUnit(containerSize.y)} / 2)`;
		style.left = `calc(50% - ${addUnit(containerSize.x)} / 2)`;
	}

	useLayoutEffect(() => {
		const current = containerRef.current;
		if (!current) {
			return;
		}
		setContainerSize((prev) => {
			return {
				...prev,
				x: current.clientWidth,
			};
		});

		setContainerSize((prev) => {
			return {
				...prev,
				y: current.clientHeight,
			};
		});
	}, [containerRef]);

	function handleClick() {
		props.onClose?.();
	}

	return (
		<Draggable
			bounds="parent"
			defaultClassNameDragging={sharedStyles.grabbing}
		>
			<div
				className={`${styles.container} ${
					props.topLayer && styles.topLayer
				} ${props.showOverflow && styles.showOverflow}`}
				style={style}
				ref={containerRef}
			>
				{props.children}
				{props.onClose && (
					<div className={styles.close} onClick={handleClick}>
						<DynamicImage src={xMark} alt={"close"} />
					</div>
				)}
			</div>
		</Draggable>
	);
}
