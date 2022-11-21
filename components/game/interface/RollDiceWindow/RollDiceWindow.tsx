import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import { IResolvableItemRenderData } from "../../../../interfaces/ActionService/IResolvableItem";
import { AnimationWindow } from "./AnimationWindow";

type Props = {
  item: IResolvableItemRenderData | null;
  setResolved: React.Dispatch<React.SetStateAction<Map<string, boolean>>>;
  resolved: Map<string, boolean>;
};
export const RollDiceWindow = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.item?.diceRoll && (
        <AnimationWindow
          item={props.item}
          setResolved={props.setResolved}
          resolved={props.resolved}
        />
      )}
    </div>
  );
};
