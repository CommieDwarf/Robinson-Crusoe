import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import { RollDiceAnimation } from "../../RollDiceAnimation/RollDiceAnimation";
import {
  RollDiceResult,
  WeatherDiceSide,
  WeatherResults,
} from "../../../../../interfaces/RollDice/RollDice";

type Props = {
  results: Map<keyof WeatherResults, RollDiceResult<WeatherDiceSide>>;
  setResolved: () => void;
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
          setResolved={props.setResolved}
          resolved={props.resolved}
        />
      )}
    </div>
  );
};
