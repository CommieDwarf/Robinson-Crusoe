// @flow
import * as React from "react";
import styles from "./Frame.module.css";
import boardImg from "/public/UI/misc/board.webp";
import boardVertImg from "/public/UI/misc/board-vert.webp";
import ResizableImage from "../../../../DynamicImage/DynamicImage";

export const Frame = () => {
	return (
		<div className={styles.container}>
			<div className={styles.topBar}>
				<ResizableImage src={boardImg} alt={"ramka"} />
			</div>
			<div className={styles.leftBar}>
				<ResizableImage src={boardVertImg} alt={"ramka"} />
			</div>

			<div className={styles.rightBar}>
				<ResizableImage src={boardVertImg} alt={"ramka"} />
			</div>
			<div className={styles.botBar}>
				<ResizableImage src={boardImg} alt={"tło"} />
			</div>
		</div>
	);
};
