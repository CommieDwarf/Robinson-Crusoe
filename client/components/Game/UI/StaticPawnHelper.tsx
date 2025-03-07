import { PAWN_HELPER_ACTION } from "@shared/types/Game/Pawns/Pawn";
import styles from "./Pawn.module.css";
import React from "react";
import ResizableImage from "../../DynamicImage/DynamicImage";
import { kebabCase } from "lodash";

interface Props {
	action: PAWN_HELPER_ACTION;
}

export function StaticPawnHelper(props: Props) {
	return (
		<div className={styles.container}>
			<div
				className={`${styles.pawn} ${
					styles[kebabCase(props.action)]
				} borderless`}
			>
				<ResizableImage
					src={`/UI/characters/pawns/helper.webp`}
					alt={"helper"}
				/>
			</div>
		</div>
	);
}
