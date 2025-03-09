// @flow
import * as React from "react";
import styles from "./Dices.module.css";
import rainImg from "/public/UI/scenarios/rain.webp";
import snowImg from "/public/UI/scenarios/snow.webp";
import hungryAnimalImg from "/public/UI/scenarios/hungryAnimal.webp";
import DynamicImage from "../../../../DynamicImage/DynamicImage";

type Props = {
	animals: boolean;
	rain: boolean;
	snow: boolean;
};
export const Dices = (props: Props) => {
	return (
		<div className={styles.container}>
			{props.rain && (
				<div className={`${styles.dice} ${styles.rain}`}>
					<DynamicImage
						src={rainImg}
						fill
						alt={"kość deszczu"}
						sizes={styles.dice}
					/>
				</div>
			)}
			{props.snow && (
				<div className={`${styles.dice} ${styles.snow}`}>
					<DynamicImage
						src={snowImg}
						fill
						alt={"kość śniegu"}
						sizes={styles.dice}
					/>
				</div>
			)}
			{props.animals && (
				<div className={`${styles.dice} ${styles.animals}`}>
					<DynamicImage
						src={hungryAnimalImg}
						fill
						alt={"kość wygłodniawych zwierząt"}
						sizes={styles.dice}
					/>
				</div>
			)}
		</div>
	);
};
