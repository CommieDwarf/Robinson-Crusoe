// @flow
import * as React from "react";
import styles from "./Resource.module.css";
import Image from "next/image";
import { TRANSLATE_PL } from "../../../../../../../interfaces/TRANSLATE_PL/TRANSLATE_PL";

type WeatherResource = "roof" | "palisade" | "food" | "wood" | "weapon";

type Props = {
  type: WeatherResource;
  amount: number;
};
export const Resource = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelImg}>
        <Image
          src={"/interface/weather/resources/" + props.type + ".png"}
          layout={"fill"}
          alt={TRANSLATE_PL[props.type]}
        />
      </div>
      <div className={styles.labelText}>{TRANSLATE_PL[props.type]}</div>
      <div className={styles.amount}>{props.amount}</div>
    </div>
  );
};
