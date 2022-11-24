// @flow
import * as React from "react";
import styles from "./WeatherToken.module.css";
import Image from "next/image";
import { IWeatherTokens } from "../../../../../interfaces/Weather/Weather";

type Props = {
  token: keyof IWeatherTokens;
};
export const WeatherToken = (props: Props) => {
  return (
    <div className={styles.container}>
      <Image
        src={`/interface/weather/${props.token}.png`}
        layout={"fill"}
        alt={"token pogody"}
      />
    </div>
  );
};
