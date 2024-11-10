import { CSSProperties } from "react";
import styles from "./FormError.module.css";

interface Props {
	error: string | "";
	className?: string;
	style?: CSSProperties;
}

export function FormError(props: Props) {
	return (
		<div className={`${styles.container} ${props.className && props.className}`} style={props.style}>
			{props.error && (
				<>
					<i className="icon-warning"></i>
					{props.error}
				</>
			)}
		</div>
	);
}
