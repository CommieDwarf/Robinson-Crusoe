import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import RollDiceAnimation from "../../RollDiceAnimation/RollDiceAnimation";
import {
  ActionDice,
  ActionDiceResults,
  WeatherDice,
} from "../../../../../interfaces/RollDice/RollDice";
import { IResolvableItemRenderData } from "../../../../../interfaces/ActionService/IResolvableItem";
import Entries from "../../../../../interfaces/Entries";
import { AdventureAction } from "../../../../../interfaces/ACTION";

type Props = {
  resolvableItem: IResolvableItemRenderData | null;
  type: AdventureAction;
  setItemAnimationDone: (id: string) => void;
  reRollClicked: boolean;
  reRoll: (dice: ActionDice) => void;
  reRolledDice: ActionDice | null;
};
export const RollDiceWindow = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.resolvableItem && props.resolvableItem.rollDiceResults && (
        <RollDiceAnimation
          name={props.resolvableItem.id}
          results={
            new Map(
              Object.entries(
                props.resolvableItem.rollDiceResults
              ) as Entries<ActionDiceResults>
            )
          }
          type={props.type}
          onFinish={props.setItemAnimationDone}
          reRolledDice={props.reRolledDice}
          fixed={props.reRollClicked}
          reRoll={props.reRoll}
        />
      )}
    </div>
  );
};
