import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import dropDownMenuStyles from "./DropDownMenu.module.css";

type Direction = "top" | "right" | "bottom" | "left";

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
	children?: JSX.Element;
	delay?: number
}

const DropdownMenu = ({
	isOpen,
	size,
	direction,
	root,
	onClose,
	styles,
	delay,
	children,
}: Props) => {
	const currentStyle = isOpen
		? mappedStyles.open[direction]
		: mappedStyles.closed[direction];

	const style: CSSProperties = {
		...styles,
		...size,
		...currentStyle,
		transition: `all ${delay ?? 500}ms`
	};

	return ReactDOM.createPortal(
		<div
			onClick={onClose}
			style={style}
			className={`${dropDownMenuStyles.container} ${
				dropDownMenuStyles[direction]
			} ${
				dropDownMenuStyles[
					`${direction}--${isOpen ? "open" : "closed"}`
				]
			}`}
		
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
