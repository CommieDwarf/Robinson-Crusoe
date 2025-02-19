import styles from "./ResourceDepleted.module.css";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";
import xMarkImg from "/public/UI/misc/x-mark.png";
import React from "react";
import { Side } from "@shared/types/Game/TileService/TileResourceService";

interface Props {
	side: Side;
}

export function ResourceDepleted(props: Props) {
	return (
		<div className={`${styles.container} ${styles[props.side]}`}>
			<ResizableImage src={xMarkImg} alt={"źródło wyczerpane"} />
		</div>
	);
}
