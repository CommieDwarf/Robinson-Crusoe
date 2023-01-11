import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import { RollDiceAnimation } from "../../RollDiceAnimation/RollDiceAnimation";
import {
  WeatherDice,
  WeatherDiceResult,
} from "../../../../../interfaces/RollDice/RollDice";

type Props = {
  results: Map<keyof WeatherDice, WeatherDiceResult>;
  setResolved: (name: string) => void;
  resolved: boolean;
};
export const RollDiceWindow = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.results.size > 0 && (
        <RollDiceAnimation
          name={"weather"}
          results={props.results}
          type={"weather"}
          onFinish={props.setResolved}
        />
      )}
    </div>
  );
};
