import styles from "./TileModifier.module.css";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import timeConsumingActionToken from "/public/UI/tokens/time-consuming-action.png";
import greaterDangerToken from "/public/UI/tokens/greater-danger.png";
import xMarkImg from "/public/UI/misc/x-mark.png";
import React from "react";

interface Props {
	type: "timeConsumingAction" | "greaterDanger" | "terrainDepleted";
}

export function TileModifier(props: Props) {
	let src;

	switch (props.type) {
		case "timeConsumingAction":
			src = timeConsumingActionToken;
			break;
		case "greaterDanger":
			src = greaterDangerToken;
			break;
		case "terrainDepleted":
			src = xMarkImg;
			break;
	}

	return (
		<div
			className={`${styles.container} ${
				props.type === "terrainDepleted" && styles.terrainDepleted
			}`}
		>
			<ResizableImage src={src} alt={"zagrożenie"} />
		</div>
	);
}
