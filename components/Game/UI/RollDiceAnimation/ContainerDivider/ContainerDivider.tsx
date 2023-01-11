// @flow
import * as React from "react";
import styles from "./ContainerDivider.module.css";
import { IDice } from "../../../../../interfaces/Dice/Dice";

type Props = {
  dices: IDice[];
};
export const ContainerDivider = (props: Props) => {
  console.log(props.dices);
  const dividers = props.dices.map((dice, i) => {
    return (
      <div
        onMouseEnter={dice.onMouseEnter}
        onMouseLeave={dice.onMouseLeave}
        className={`${styles.divider} ${
          styles["divideBy" + props.dices.length]
        }`}
        key={i}
      ></div>
    );
  });

  return <div className={styles.container}>{dividers}</div>;
};
