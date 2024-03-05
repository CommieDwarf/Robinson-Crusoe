// @flow
import * as React from "react";
import styles from "./Weather.module.css";
import { IWeatherTokens } from "../../../../../interfaces/Weather/Weather";
import { WeatherToken } from "./WeatherToken/WeatherToken";

type Props = {
  tokens: IWeatherTokens;
};

export const Weather = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.tokens.storm && <WeatherToken token={"storm"} />}
      {props.tokens.snow && <WeatherToken token={"snow"} />}
      {props.tokens.rain && <WeatherToken token={"rain"} />}
    </div>
  );
};
