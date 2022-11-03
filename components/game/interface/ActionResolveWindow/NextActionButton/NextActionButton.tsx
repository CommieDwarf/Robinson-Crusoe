// @flow
import * as React from "react";
import { Action } from "../../../../../interfaces/Action";
import styles from "./NextActionButton.module.css";
import Image from "next/image";
import { actionOrder } from "../../actionsOrder/ActionsOrder";

type Props = {
  currentAction: Action;
};

export const NextActionButton = (props: Props) => {
  const currentActionIndex = actionOrder.findIndex(
    (action) => props.currentAction === action
  );
  const nextActionIndex =
    currentActionIndex === actionOrder.length + 1 ? 0 : currentActionIndex + 1;
  const nextAction = actionOrder[nextActionIndex];

  return (
    <div className={styles.container}>
      <div className={styles.arrow}>
        <Image
          src={"/interface/actions/red-arrow.png"}
          layout={"fill"}
          alt={"Następna akcja"}
        />
      </div>
      <div className={styles.nextAction}>
        <Image
          src={"/interface/actions/" + nextAction + ".png"}
          layout={"fill"}
          alt={"Następna akcja"}
        />
      </div>
    </div>
  );
};
