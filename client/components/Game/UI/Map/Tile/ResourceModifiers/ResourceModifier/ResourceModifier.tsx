import styles from "./ResourceModifier.module.css";
import DynamicImage from "../../../../../../DynamicImage/DynamicImage";
import React from "react";
import { Side } from "@floating-ui/utils";
import { TileResource } from "@shared/types/Game/TileService/ITile";

interface Props {
	side: Side;
	resource: TileResource;
}

export function ResourceModifier(props: Props) {
	return (
		<div className={`${styles.container} ${styles[props.side]}`}>
			<DynamicImage
				src={`/UI/tokens/modifiers/${props.resource}.webp`}
				alt={"dodatkowy zasób"}
				fill
			/>
		</div>
	);
}
