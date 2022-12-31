// @flow
import * as React from "react";
import { ACTION } from "../../../../../interfaces/ACTION";
import styles from "./NextActionButton.module.css";
import Image from "next/image";
import { actionOrder } from "../../../../../constants/actionOrder";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import { getImgName } from "../../../../../utils/getImgName";

type Props = {
  currentAction: ACTION;
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
      : "next-turn";

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
          src={redArrowImg}
          fill
          alt={"Następna akcja"}
          sizes={styles.arrow}
        />
      </div>
      <div className={styles.nextAction}>
        <Image
          src={`/UI/actions/${getImgName(nextAction)}.png`}
          fill
          alt={"Następna akcja"}
          sizes={styles.nextAction}
        />
      </div>
    </div>
  );
};
