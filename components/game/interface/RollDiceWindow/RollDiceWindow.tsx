import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import { AnimationWindow } from "./AnimationWindow";
import { IResolvableItemRenderData } from "../../../../interfaces/ActionService/IResolvableItem";
import { Animation } from "./Animation";

type Props = {
  item: IResolvableItemRenderData;
  setResolved: React.Dispatch<React.SetStateAction<Map<string, boolean>>>;
};
export const RollDiceWindow = (props: Props) => {
  return (
    <div className={styles.container}>
      <Animation />
    </div>
  );
};
