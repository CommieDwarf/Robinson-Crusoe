import Image from "next/image";
import React from "react";
import styles from "./RestArrange.module.css";
import Scrollbar from "../../Scrollbar";
import scrollbarStyles from "./Scrollbar.module.css";
import ActionSlot from "../../ActionSlot";

interface Props {
  activity: "arrangeCamp" | "rest";
}

const activityPL = {
  arrangeCamp: "Porządkowanie obozu",
  rest: "Odpoczynek",
};

export default function RestArrange(props: Props) {
  let rewardLabel;

  if (props.activity === "arrangeCamp") {
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
          <Image src="/interface/additionalActivities/heart.png" layout="fill" alt="serce" />
        </div>
      </div>
    );
  }

  const slotSize = {
    width: "25px",
    height: "25px"
  }

  return (
    <div className={styles[props.activity] + " " + styles.activity}>
      <div className={styles.activityName}>{activityPL[props.activity]}</div>
        {rewardLabel}
      <Scrollbar styleModule={scrollbarStyles}     
      >
        <div className={styles.actionSlots}>
            <ActionSlot type={"leader"} pawn={null} action={props.activity} context={props.activity} id={props.activity + "-1" }/>
            <ActionSlot type={"leader"} pawn={null} action={props.activity} context={props.activity} id={props.activity + "-2" }/>
        </div>
      </Scrollbar>
    </div>
  );
}
