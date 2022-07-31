import Image from "next/image";
import React from "react";
import styles from "./RestArrange.module.css";
import Scrollbar from "../../Scrollbar";
import scrollbarStyles from "./Scrollbar.module.css";
import ActionSlot from "../../ActionSlot";
import AdditionalActivity from "../../../../../interfaces/AdditionalActivity";
import Pawn from "../../../../../interfaces/Pawns/Pawn";

interface Props {
  activity: AdditionalActivity;
  actionSlots: Map<string, Pawn | null>;
}

const activityPL = {
  arrange: "Porządkowanie obozu",
  rest: "Odpoczynek",
};

export default function RestArrange(props: Props) {
  let rewardLabel;

  if (props.activity.type === "arrange") {
    rewardLabel = (
      <div className={styles.activityReward}>
        <div className={styles.determinationReward}>
          <div className={styles.determinationValue}>2</div>
          <div className={styles.moraleIcon}>
            <Image
              src="/interface/additionalActivities/morale-icon.png"
              layout="fill"
              alt="token determinacji"
            />
          </div>
        </div>
        <div className={styles.moraleReward}>
          <div className={styles.moraleArrow}>
            <Image
              src="/interface/additionalActivities/morale-arrow.png"
              layout="fill"
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
            layout="fill"
            alt="serce"
          />
        </div>
      </div>
    );
  }

  const slotsQuantity =
    props.activity.pawns == 0 ? 2 : props.activity.pawns + 1;

  const actionSlots = [];

  for (let i = 1; i <= slotsQuantity; i++) {
    const id = props.activity.type + "-leader-" + i;
    let pawn = props.actionSlots.get(id);
    pawn = pawn ? pawn : null;
    actionSlots.push(
      <ActionSlot
        type="leader"
        pawn={pawn}
        action={props.activity.type}
        context={props.activity.type}
        id={id}
        key={id}
      />
    );
  }

  return (
    <div className={styles[props.activity.type] + " " + styles.activity}>
      <div className={styles.activityName}>
        {activityPL[props.activity.type]}
      </div>
      {rewardLabel}
      <Scrollbar styleModule={scrollbarStyles}>
        <div className={styles.actionSlots}>{actionSlots}</div>
      </Scrollbar>
    </div>
  );
}
