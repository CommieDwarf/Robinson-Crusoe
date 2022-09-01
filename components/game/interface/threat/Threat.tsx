import Image from "next/image";
import React from "react";
import styles from "./Threat.module.css";
import ActionSlot from "../ActionSlot";
import Card from "./Card";
import { IPawn, IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";
import {
  IThreat,
  IThreatRenderData,
} from "../../../../interfaces/Threat/Threat";

interface Props {
  threat: IThreatRenderData;
  actionSlots: Map<string, IPawnRenderData | null>;
}

export default function Threat(props: Props) {
  function getActionSlots(side: "left" | "right") {
    const actionSlots = [];

    for (let i = 1; i <= 2; i++) {
      const id = "threat-" + side + "-" + i;
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

  return (
    <div className={styles.container}>
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
