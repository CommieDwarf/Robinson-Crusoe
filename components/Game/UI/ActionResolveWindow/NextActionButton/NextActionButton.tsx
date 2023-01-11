// @flow
import * as React from "react";
import { ACTION } from "../../../../../interfaces/ACTION";
import styles from "./NextActionButton.module.css";
import Image from "next/image";
import { actionOrder } from "../../../../../constants/actionOrder";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import { getImgName } from "../../../../../utils/getImgName";
import { IActionServiceRenderData } from "../../../../../interfaces/ActionService/ActionService";

type Props = {
  setNextAction: () => void;
  setNextPhase: () => void;
  actionService: IActionServiceRenderData;
};

export const NextActionButton = (props: Props) => {
  const currentActionIndex = actionOrder.findIndex(
    (action) => props.actionService.action === action
  );
  const nextActionIndex = currentActionIndex + 1;
  const nextAction =
    nextActionIndex < actionOrder.length
      ? actionOrder[nextActionIndex]
      : "next-turn";

  function clickHandle() {
    props.setNextAction();
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
