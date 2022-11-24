// @flow
import * as React from "react";
import styles from "./WeatherTokens.module.css";
import { WeatherToken } from "../../../Weather/WeatherToken/WeatherToken";
import { IWeatherTokens } from "../../../../../../interfaces/Weather/Weather";

type Props = {
  tokens: IWeatherTokens;
};

export const WeatherTokens = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.tokens.storm && <WeatherToken token={"storm"} />}
      {props.tokens.snow && <WeatherToken token={"snow"} />}
      {props.tokens.rain && <WeatherToken token={"rain"} />}
    </div>
  );
};
