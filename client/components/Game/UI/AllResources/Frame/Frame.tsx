// @flow
import * as React from "react";
import styles from "./Frame.module.css";
import boardImg from "/public/UI/misc/board.webp";
import boardVertImg from "/public/UI/misc/board-vert.webp";
import DynamicImage from "../../../../DynamicImage/DynamicImage";

export const Frame = () => {
	return (
		<div className={styles.container}>
			<div className={styles.topBar}>
				<DynamicImage src={boardImg} alt={"ramka"} />
			</div>
			<div className={styles.leftBar}>
				<DynamicImage src={boardVertImg} alt={"ramka"} />
			</div>

			<div className={styles.rightBar}>
				<DynamicImage src={boardVertImg} alt={"ramka"} />
			</div>
			<div className={styles.botBar}>
				<DynamicImage src={boardImg} alt={"tło"} />
			</div>
		</div>
	);
};
