// @flow
import * as React from "react";
import styles from "./CloudsTotal.module.css";
import Image from "next/image";
import { OverallWeather } from "../../../../../../interfaces/Weather/Weather";

type Props = {
  overallWeather: OverallWeather;
};
export const CloudsTotal = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>Łącznie:</div>
      <div className={styles.background}>
        <div className={styles.cloud}>
          <span className={styles.cloudCount}>{props.overallWeather.snow}</span>
          <Image
            src={"/interface/weather/snowCloud.png"}
            layout={"fill"}
            alt={"chmurka zimowa"}
          />
        </div>
      </div>
      <div className={styles.background}>
        <div className={styles.cloud}>
          <span className={styles.cloudCount}>{props.overallWeather.rain}</span>
          <Image
            src={"/interface/weather/rainCloud.png"}
            layout={"fill"}
            alt={"chmurka deszczowa"}
          />
        </div>
      </div>
    </div>
  );
};
