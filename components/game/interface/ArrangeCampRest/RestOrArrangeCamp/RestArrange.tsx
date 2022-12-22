import Image from "next/image";
import React from "react";
import styles from "./RestArrange.module.css";
import Scrollbar from "../../Scrollbar";
import scrollbarStyles from "./Scrollbar.module.css";
import ActionSlot from "../../ActionSlot";
import { IPawnRenderData } from "../../../../../interfaces/Pawns/Pawn";
import { ACTION_PL } from "../../../../../interfaces/TRANSLATE_PL/CATEGORIES/ACTION_PL";

interface Props {
  pawnAmount: number;
  type: "rest" | "arrangeCamp";
  actionSlots: Map<string, IPawnRenderData | null>;
}

export default function RestArrange(props: Props) {
  let rewardLabel;

  if (props.type === "arrangeCamp") {
    rewardLabel = (
      <div className={styles.activityReward}>
        <div className={styles.determinationReward}>
          <div className={styles.determinationValue}>2</div>
          <div className={styles.moraleIcon}>
            <Image
              src="/interface/additionalActivities/morale-icon.png"
              fill
              alt="token determinacji"
              sizes={styles.moraleIcon}
            />
          </div>
        </div>
        <div className={styles.moraleReward}>
          <div className={styles.moraleArrow}>
            <Image
              src="/interface/additionalActivities/morale-arrow.png"
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
          <Image
            src="/interface/additionalActivities/heart.png"
            fill
            sizes={styles.heart}
            alt="serce"
          />
        </div>
      </div>
    );
  }

  const slotsQuantity = props.pawnAmount == 0 ? 2 : props.pawnAmount + 1;

  const actionSlots = [];

  for (let i = 1; i <= slotsQuantity; i++) {
    const id = props.type + "-" + (i - 1) + "-leader-0";
    id;
    let pawn = props.actionSlots.get(id);
    pawn = pawn ? pawn : null;
    actionSlots.push(
      <ActionSlot
        type="leader"
        pawn={pawn}
        action={props.type}
        context={props.type}
        id={id}
        key={id}
      />
    );
  }

  return (
    <div className={styles[props.type] + " " + styles.activity}>
      <div className={styles.activityName}>{ACTION_PL[props.type]}</div>
      {rewardLabel}
      <Scrollbar styleModule={scrollbarStyles}>
        <div className={styles.actionSlots}>{actionSlots}</div>
      </Scrollbar>
    </div>
  );
}
