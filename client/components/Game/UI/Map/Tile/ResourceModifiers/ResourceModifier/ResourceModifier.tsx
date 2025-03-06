import styles from "./ResourceModifier.module.css";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";
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
			<ResizableImage
				src={`/UI/tokens/modifiers/${props.resource}.png`}
				alt={"dodatkowy zasób"}
				fill
			/>
		</div>
	);
}
