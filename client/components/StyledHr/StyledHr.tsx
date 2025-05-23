import { CSSProperties } from "react";

interface Props {
	color?: "border" | "darkRed" | string;
	className?: string;
	style?: CSSProperties;
}

export function StyledHr(props: Props) {
	let borderTop = "1px solid ";
	let borderBottom = "1px solid ";

	switch (props.color) {
		case "border":
			setColor("var(--borderColor)");
			break;
		case "darkRed":
			setColor("var(--hunt)");
			break;
		default:
			setColor("var(--hunt)");
	}

	function setColor(color: string) {
		borderTop += color;
		borderBottom += color;
	}

	return (
		<hr
			style={{ borderTop, borderBottom, ...props.style }}
			className={props.className}
		/>
	);
}
