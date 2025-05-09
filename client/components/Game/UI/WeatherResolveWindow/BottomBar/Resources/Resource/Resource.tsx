// @flow
import * as React from "react";
import styles from "./Resource.module.css";
import { Subtrahend } from "../Resources";
import DynamicImage from "../../../../../../DynamicImage/DynamicImage";
import { OverallWeather } from "@shared/types/Game/Weather/Weather";
import { dynamicTranslate } from "utils/dynamicTranslate";

type WeatherResource = "roof" | "palisade" | "food" | "wood" | "weapon";

type Props = {
	type: WeatherResource;
	amount: number;
	overallWeather: OverallWeather;
	subtrahends: Map<Subtrahend, number>;
	resolved: boolean;
};
export const Resource = (props: Props) => {
	const subtrahends: JSX.Element[] = [];
	let total = props.amount;


	props.subtrahends.forEach((value, key) => {
		total += value;
		subtrahends.push(
			<div className={styles.subtrahend} key={key}>
				<span className={styles.subtrahendValue}>{value}</span>
				<div className={styles.subtrahendImage}>
					<DynamicImage
						src={`/UI/weather/subtrahends/${key}.webp`}
						alt={"wynik"}
					/>
				</div>
			</div>
		);
	});

	const totalColorClass = total >= 0 ? styles.surplus : styles.deficit;

	const amount = (
		<div className={styles.amount}>
			<span>{props.amount}</span>
			{props.resolved && (
				<span className={totalColorClass}>
					<span className={styles.parenthesis}>(</span>
					{total}
					<span className={styles.parenthesis}>)</span>
				</span>
			)}
		</div>
	);
	return (
		<div className={styles.container}>
			<div className={styles.labelImg}>
				<DynamicImage
					src={`/UI/weather/resources/${props.type}.webp`}
					fill
					alt={props.type}
					sizes={styles.labelImg}
				/>
			</div>
			<div className={styles.labelText}>
				{dynamicTranslate(props.type)}
			</div>
			{amount}
			{props.subtrahends.size > 0 && props.resolved && (
				<div className={styles.subtrahends}>{subtrahends}</div>
			)}
		</div>
	);
};
