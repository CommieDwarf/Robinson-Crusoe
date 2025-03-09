import React, { CSSProperties, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import dropDownMenuStyles from "./DropDownMenu.module.css";

type Direction = "top" | "right" | "bottom" | "left";
const defaultDuration = 500;


interface Props {
	isOpen: boolean;
	size: {
		width: string;
		height: string;
	};
	direction: Direction;
	root: Element | DocumentFragment;
	onClose?: () => void;
	styles?: React.CSSProperties;
	children?: JSX.Element | JSX.Element[];
	delay?: number;
	onOuterClick?: (event: MouseEvent) => void;
}

const DropdownMenu = ({
	isOpen,
	size,
	direction,
	root,
	styles,
	delay,
	children,
	onOuterClick,
}: Props) => {
	const currentStyle = isOpen
		? mappedStyles.open[direction]
		: mappedStyles.closed[direction];


	const style: CSSProperties = {
		...styles,
		...size,
		...currentStyle,
		transitionDuration: `${delay ?? defaultDuration}ms`,
		transitionProperty: ["top", "bottom"].includes(direction) ? "height" : "width"
	};

	const containerRef = useRef(null);

	useEffect(() => {
		if (!onOuterClick) {
			return;
		}
		function handleOuterClick(event: MouseEvent) {
			const {current} = containerRef;
			if (!onOuterClick || !current) {
				return;
			}
			const target = event.target as HTMLElement;
			if (!(current as HTMLElement).contains(target)) {
				onOuterClick(event);
			}
		}

		window.addEventListener("click", handleOuterClick);
		return () => {
			window.removeEventListener("click", handleOuterClick);
		};
	}, [onOuterClick, containerRef.current]);

	return ReactDOM.createPortal(
		<div
			style={style}
			className={`${dropDownMenuStyles.container} ${
				dropDownMenuStyles[direction]
			} ${
				dropDownMenuStyles[
					`${direction}--${isOpen ? "open" : "closed"}`
				]
			}`}
			ref={containerRef}
		>
			{children}
		</div>,
		root
	);
};

export default DropdownMenu;

const mappedStyles = {
	open: {
		top: {
			bottom: 0,
		},
		bottom: {
			top: 0,
		},
		right: {
			left: 0,
		},
		left: {
			right: 0,
		},
	},
	closed: {
		top: {
			bottom: 0,
			height: 0,
		},
		right: {
			left: 0,
			width: 0,
		},
		bottom: {
			top: 0,
			height: 0,
		},
		left: {
			right: 0,
			width: 0,
		},
	},
};
