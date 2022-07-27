// @flow
import * as React from "react";
import styles from "./WeatherAndNight.module.css";
import { WeatherOrNight } from "./WeatherOrNight/WeatherOrNight";

type Props = {};

export const WeatherAndNight = (props: Props) => {
  return (
    <div className={styles.container}>
      <WeatherOrNight type={"weather"} />
      <WeatherOrNight type={"night"} />
    </div>
  );
};
