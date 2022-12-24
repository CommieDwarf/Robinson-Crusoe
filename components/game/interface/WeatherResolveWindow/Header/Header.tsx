// @flow
import * as React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { RoundSquare } from "../../scenario/Scenario/Scenarios/Castaways/RoundSquare";

type Props = {
  round: number;
  setNextPhase: () => void;
  resolved: boolean;
};
export const Header = (props: Props) => {
  function handleClick() {
    props.setNextPhase();
  }

  return (
    <div className={styles.container}>
      <div className={styles.symbol}>
        <Image
          src={"/interface/phase/weather.png"}
          fill
          alt={"pogoda"}
          sizes={styles.symbol}
        />
      </div>
      <span className={styles.title}>Faza Pogody</span>
      <div className={styles.symbol + " " + styles.round}>
        <RoundSquare
          round={12}
          currentRound={true}
          ship={false}
          weather={{ rain: false, snow: false, hungryAnimal: false }}
        />
      </div>
      {props.resolved && (
        <div className={styles.nextPhaseButton} onClick={handleClick}>
          <div className={styles.arrow}>
            <Image
              src={"/interface/weather/red-arrow.png"}
              alt={"strzałka"}
              fill
              sizes={styles.arrow}
            />
          </div>
          <div className={styles.night}>
            <Image
              src={"/interface/phase/night.png"}
              alt={"następna faza"}
              fill
              sizes={styles.night}
            />
          </div>
        </div>
      )}
    </div>
  );
};
