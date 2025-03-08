// @flow
import * as React from "react";
import { useState } from "react";
import styles from "./RollDiceButton.module.css";
import dicesImg from "/public/UI/misc/dices.webp";
import ResizableImage from "../../../../DynamicImage/DynamicImage";
import { OTHER_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { useAppDispatch } from "../../../../../store/hooks";
import { socketEmitAction } from "../../../../../middleware/socketMiddleware";

export const RollDiceButton = () => {
	const [clicked, setClicked] = useState(false);

	const dispatch = useAppDispatch();

	function handleClick() {
		if (!clicked) {
			dispatch(
				socketEmitAction(OTHER_CONTROLLER_ACTION.ROLL_WEATHER_DICES)
			);
			setClicked(true);
		}
	}

	const clickedClass = clicked ? styles.clicked : styles.notClicked;

	return (
		<div
			className={`${styles.container} ${clickedClass}`}
			onClick={handleClick}
		>
			<ResizableImage
				className={"dices"}
				src={dicesImg}
				fill
				alt={"losuj"}
				sizes={styles.container}
			/>
			<span className={styles.roll}>Losuj!</span>
		</div>
	);
};
