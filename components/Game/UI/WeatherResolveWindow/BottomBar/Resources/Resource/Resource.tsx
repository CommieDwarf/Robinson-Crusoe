// @flow
import * as React from "react";
import styles from "./Resource.module.css";
import Image from "next/image";
import { TRANSLATE_PL } from "../../../../../../../interfaces/TRANSLATE_PL/TRANSLATE_PL";
import { OverallWeather } from "../../../../../../../interfaces/Weather/Weather";
import { Subtrahend } from "../Resources";

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
          <Image
            src={`/UI/weather/subtrahends/${key}.png`}
            fill
            alt={"wynik"}
            sizes={styles.subtrahendImage}
          />
        </div>
      </div>
    );
  });

  const totalColorClass = total >= 0 ? styles.surplus : styles.deficit;

  let amount = (
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
        <Image
          src={`/UI/weather/resources/${props.type}.png`}
          fill
          alt={TRANSLATE_PL[props.type]}
          sizes={styles.labelImg}
        />
      </div>
      <div className={styles.labelText}>{TRANSLATE_PL[props.type]}</div>
      {amount}
      {props.subtrahends.size > 0 && props.resolved && (
        <div className={styles.subtrahends}>{subtrahends}</div>
      )}
    </div>
  );
};
