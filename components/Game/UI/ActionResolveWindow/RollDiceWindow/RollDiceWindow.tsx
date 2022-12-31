import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import { RollDiceAnimation } from "../../RollDiceAnimation/RollDiceAnimation";
import {
  ActionDiceSide,
  ActionResults,
  DiceActionType,
  RollDiceResult,
} from "../../../../../interfaces/RollDice/RollDice";

type Props = {
  name: string | null;
  results: Map<keyof ActionResults, RollDiceResult<ActionDiceSide>>;
  type: DiceActionType;
  setResolved: (name: string) => void;
  resolved: boolean;
};
export const RollDiceWindow = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.name && props.results.size > 0 && (
        <RollDiceAnimation
          name={props.name}
          results={props.results}
          type={props.type}
          setResolved={props.setResolved}
          resolved={props.resolved}
        />
      )}
    </div>
  );
};
