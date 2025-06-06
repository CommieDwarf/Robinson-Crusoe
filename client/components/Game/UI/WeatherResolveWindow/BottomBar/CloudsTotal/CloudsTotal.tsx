// @flow
import * as React from "react";
import styles from "./CloudsTotal.module.css";
import snowCloudImg from "/public/UI/weather/snow-cloud.webp";
import rainCloudImg from "/public/UI/weather/rain-cloud.webp";
import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import { IWeatherServiceRenderData } from "@shared/types/Game/Weather/Weather";

type Props = {
	weatherService: IWeatherServiceRenderData;
	resolved: boolean;
};
export const CloudsTotal = (props: Props) => {
	return (
		<div className={styles.container}>
			<div className={styles.label}>Łącznie:</div>
			<div className={styles.background}>
				<div className={styles.cloud}>
					<span className={styles.cloudCount}>
						{props.weatherService.overallWeather.snow}
					</span>
					<DynamicImage
						src={snowCloudImg}
						fill
						alt={"chmurka zimowa"}
						sizes={styles.cloud}
					/>
				</div>
			</div>
			<div className={styles.background}>
				<div className={styles.cloud}>
					<span className={styles.cloudCount}>
						{props.weatherService.overallWeather.rain}
					</span>
					<DynamicImage
						src={rainCloudImg}
						fill
						alt={"chmurka deszczowa"}
						sizes={styles.cloud}
					/>
				</div>
			</div>
		</div>
	);
};
