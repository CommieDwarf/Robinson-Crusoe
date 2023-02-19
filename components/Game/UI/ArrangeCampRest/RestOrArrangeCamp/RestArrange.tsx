import Image from "next/image";
import React from "react";
import styles from "./RestArrange.module.css";
import Scrollbar from "../../Scrollbar";
import scrollbarStyles from "./Scrollbar.module.css";
import ActionSlot from "../../ActionSlot";
import { IPawnRenderData } from "../../../../../interfaces/Pawns/Pawn";
import { ACTION } from "../../../../../interfaces/ACTION";
import {
  ACTION_ITEM,
  getDroppableID,
} from "../../../../../utils/getDroppableID";

import moraleArrowRightImg from "/public/UI/icons/morale-arrow-right.png";
import heartImg from "/public/UI/icons/heart.png";
import moraleIconImg from "/public/UI/icons/morale.png";
import { useTranslation } from "react-i18next";

interface Props {
  pawnAmount: number;
  type: ACTION.ARRANGE_CAMP | ACTION.REST;
}

export default function RestArrange(props: Props) {
  let rewardLabel;

  if (props.type === ACTION.ARRANGE_CAMP) {
    rewardLabel = (
      <div className={styles.activityReward}>
        <div className={styles.determinationReward}>
          <div className={styles.determinationValue}>2</div>
          <div className={styles.moraleIcon}>
            <Image
              src={moraleIconImg}
              fill
              alt="token determinacji"
              sizes={styles.moraleIcon}
            />
          </div>
        </div>
        <div className={styles.moraleReward}>
          <div className={styles.moraleArrow}>
            <Image
              src={moraleArrowRightImg}
              fill
              sizes={styles.moraleArrow}
              alt="strzałka morali"
            />
          </div>
        </div>
      </div>
    );
  } else {
    rewardLabel = (
      <div className={styles.activityReward}>
        <div className={styles.plus}>+</div>
        <div className={styles.heart}>
          <Image src={heartImg} fill sizes={styles.heart} alt="serce" />
        </div>
      </div>
    );
  }

  const slotsQuantity = props.pawnAmount == 0 ? 2 : props.pawnAmount + 1;

  const actionSlots = [];

  for (let i = 1; i <= slotsQuantity; i++) {
    const context =
      props.type === ACTION.REST ? ACTION_ITEM.REST : ACTION_ITEM.ARRANGE_CAMP;
    const id = getDroppableID(context, "", "", i - 1);
    actionSlots.push(
      <ActionSlot
        type="leader"
        action={props.type}
        actionItem={context}
        id={id}
        key={id}
      />
    );
  }

  const [t] = useTranslation();

  return (
    <div className={styles[props.type] + " " + styles.activity}>
      <div className={styles.activityName}>{t(`action.${props.type}`)}</div>
      {rewardLabel}
      <Scrollbar styleModule={scrollbarStyles}>
        <div className={styles.actionSlots}>{actionSlots}</div>
      </Scrollbar>
    </div>
  );
}
