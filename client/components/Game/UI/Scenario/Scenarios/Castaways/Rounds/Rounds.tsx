// @flow
import * as React from "react";
import styles from "./Rounds.module.css";
import { RoundSquare } from "./RoundSquare/RoundSquare";
import { castaways } from "@shared/constants/scenarios/castaways";

type Props = {
  current: number;
};
const Rounds = (props: Props) => {
  const rounds = [];

  for (let i = 1; i <= 12; i++) {
    const ship = i >= 10;
    const weather = {
      rain: castaways.weather.rain.includes(i),
      snow: castaways.weather.winter.includes(i),
      hungryAnimal: castaways.weather.animals.includes(i),
    };
    const current = i === props.current;
    rounds.push(
      <div className={styles.square} key={i}>
        <RoundSquare
          round={i}
          ship={ship}
          weather={weather}
          currentRound={current}
        />
      </div>,
    );
  }

  return (
    <div className={`${styles.container} tour-scenario-rounds`}>{rounds}</div>
  );
};

export default React.memo(Rounds);
