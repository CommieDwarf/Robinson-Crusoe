import Image from "next/image";
import React from "react";
import styles from "./Threat.module.css";
import ActionSlot from "../ActionSlot";
import Card from "./Card";
import { IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";
import { IEventServiceRenderData } from "../../../../interfaces/EventService/EventService";
import { EVENT_TYPE } from "../../../../interfaces/EventService/EventCard";
import { ACTION_ITEM, getDroppableID } from "../../../../utils/getDroppableID";
import { ACTION } from "../../../../interfaces/ACTION";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import redArrowCurvedImg from "/public/UI/misc/red-arrow-curved.png";

interface Props {
  threat: IEventServiceRenderData;
  zIndex: string;
}

export default function Threat(props: Props) {
  const leftCard = props.threat.leftSlot;
  const rightCard = props.threat.rightSlot;

  function getActionSlots(side: "left" | "right") {
    const actionSlots = [];
    let pawnAmount = 0;
    if (side === "left" && leftCard) {
      pawnAmount =
        leftCard.type === EVENT_TYPE.WRECKAGE
          ? 2
          : leftCard.requiredHelperAmount;
    } else if (side === "right" && rightCard) {
      pawnAmount =
        rightCard.type === EVENT_TYPE.WRECKAGE
          ? 2
          : rightCard.requiredHelperAmount;
    }
    for (let i = 0; i < pawnAmount; i++) {
      const id = getDroppableID(ACTION_ITEM.THREAT, "", side, i);
      actionSlots.push(
        <ActionSlot
          type={i === 0 ? "leader" : "helper"}
          action={ACTION.THREAT}
          context={ACTION_ITEM.THREAT}
          id={id}
          key={id}
        />
      );
    }
    return actionSlots;
  }

  const zIndexClass = props.zIndex.includes("threat")
    ? styles.zIndexIncreased
    : "";

  return (
    <div className={styles.container + " " + zIndexClass}>
      <Card card={props.threat.leftSlot} />
      <Card card={props.threat.rightSlot} />
      <div className={styles.arrow}>
        <Image src={redArrowImg} fill alt="strzałka" sizes={styles.arrow} />
      </div>
      <div className={styles.curvedArrow}>
        <Image
          src={redArrowCurvedImg}
          fill
          alt="strzałka"
          sizes={styles.curvedArrow}
        />
      </div>
      <div className={styles.actionSlots}>
        {props.threat.leftSlot && getActionSlots("left")}
      </div>
      <div className={styles.actionSlots}>
        {props.threat.rightSlot && getActionSlots("right")}
      </div>
    </div>
  );
}
