// @flow
import * as React from "react";
import { Action } from "../../../../../interfaces/Action";
import styles from "./NextActionButton.module.css";
import Image from "next/image";
import { actionOrder } from "../../../../../constants/actionOrder";

type Props = {
  currentAction: Action;
  setNextAction: () => void;
  setNextPhase: () => void;
  setResolved: React.Dispatch<React.SetStateAction<Map<string, boolean>>>;
};

export const NextActionButton = (props: Props) => {
  const currentActionIndex = actionOrder.findIndex(
    (action) => props.currentAction === action
  );
  const nextActionIndex = currentActionIndex + 1;
  const nextAction =
    nextActionIndex < actionOrder.length
      ? actionOrder[nextActionIndex]
      : "nextTurn";

  function clickHandle() {
    props.setResolved(new Map());
    if (props.currentAction === "rest") {
      props.setNextPhase();
    } else {
      props.setNextAction();
    }
  }

  return (
    <div className={styles.container} onClick={clickHandle}>
      <div className={styles.arrow}>
        <Image
          src={"/interface/actions/red-arrow.png"}
          fill
          alt={"Następna akcja"}
          sizes={styles.arrow}
        />
      </div>
      <div className={styles.nextAction}>
        <Image
          src={"/interface/actions/" + nextAction + ".png"}
          fill
          alt={"Następna akcja"}
          sizes={styles.nextAction}
        />
      </div>
    </div>
  );
};
