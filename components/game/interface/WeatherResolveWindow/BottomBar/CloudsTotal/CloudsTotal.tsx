// @flow
import * as React from "react";
import styles from "./CloudsTotal.module.css";
import Image from "next/image";
import { IWeatherServiceRenderData } from "../../../../../../interfaces/Weather/Weather";

type Props = {
  weatherService: IWeatherServiceRenderData;
  resolved: boolean;
};
export const CloudsTotal = (props: Props) => {
  let rain = props.weatherService.tokens.rain ? 1 : 0;
  let snow = props.weatherService.tokens.snow ? 1 : 0;

  return (
    <div className={styles.container}>
      <div className={styles.label}>Łącznie:</div>
      <div className={styles.background}>
        <div className={styles.cloud}>
          <span className={styles.cloudCount}>
            {props.resolved ? props.weatherService.overallWeather.snow : snow}
          </span>
          <Image
            src={"/interface/weather/snowCloud.png"}
            fill
            alt={"chmurka zimowa"}
            sizes={styles.cloud}
          />
        </div>
      </div>
      <div className={styles.background}>
        <div className={styles.cloud}>
          <span className={styles.cloudCount}>
            {props.resolved ? props.weatherService.overallWeather.rain : rain}
          </span>
          <Image
            src={"/interface/weather/rainCloud.png"}
            fill
            alt={"chmurka deszczowa"}
            sizes={styles.cloud}
          />
        </div>
      </div>
    </div>
  );
};
