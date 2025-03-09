import styles from "./TileModifier.module.css";
import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import timeConsumingActionToken from "/public/UI/tokens/time-consuming-action.webp";
import greaterDangerToken from "/public/UI/tokens/greater-danger.webp";
import xMarkImg from "/public/UI/misc/x-mark.webp";
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
			<DynamicImage src={src} alt={"zagrożenie"} />
		</div>
	);
}
