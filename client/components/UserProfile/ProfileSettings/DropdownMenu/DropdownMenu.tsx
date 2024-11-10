import { ReactNode, useState } from "react";
import styles from "../ProfileSettings.module.css";

interface Props {
	buttonLabel: string;
    children?: ReactNode
}

export function DropdownMenu(props: Props) {
	const [expanded, setExpanded] = useState(false);


    function handleButtonClick() {
        setExpanded((prev) => !prev);
    }

	return (
		<>
			<p className={styles.button} onClick={handleButtonClick}>{props.buttonLabel} {expanded ? "\u25B2" : "\u25BC" }</p>
            {expanded && props.children}
		</>
	);
}
