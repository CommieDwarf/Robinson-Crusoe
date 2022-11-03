import Image from "next/image";
import React from "react";
import styles from "./Threat.module.css";
import ActionSlot from "../ActionSlot";
import Card from "./Card";
import { IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";
import { IThreatRenderData } from "../../../../interfaces/Threat/Threat";

interface Props {
  threat: IThreatRenderData;
  actionSlots: Map<string, IPawnRenderData | null>;
  zIndex: string;
}

export default function Threat(props: Props) {
  function getActionSlots(side: "left" | "right") {
    const actionSlots = [];

    for (let i = 0; i <= 1; i++) {
      const role = i === 0 ? "leader" : "helper";
      const id = `threat-${side}-${role}-${i}`;
      let pawn = props.actionSlots.get(id);
      pawn = pawn ? pawn : null;
      actionSlots.push(
        <ActionSlot
          type="leader"
          pawn={pawn}
          action="threat"
          context="threat"
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
        <Image
          src="/interface/cards/red-arrow.png"
          layout="fill"
          alt="strzałka"
        />
      </div>
      <div className={styles.curvedArrow}>
        <Image
          src="/interface/cards/red-arrow-curved.png"
          layout="fill"
          alt="strzałka"
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
