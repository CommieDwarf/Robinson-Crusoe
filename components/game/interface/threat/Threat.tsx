import Image from "next/image";
import React from "react";
import styles from "./Threat.module.css";
import ActionSlot from "../ActionSlot";
import Card from "./Card";
import ThreatCards from "../../../../interfaces/threatCards";

interface Props {
  threatCards: ThreatCards;
}

export default function Threat(props: Props) {


  return (
    <div className={styles.container}>
      <Card card={props.threatCards.left}/>
      <Card card={props.threatCards.right}/>
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
        {props.threatCards.left && (
          <>
            <ActionSlot
              type={"leader"}
              character={null}
              action={"threat"}
              context="threat"
              id="threat-left-1"
            />
            <ActionSlot
              type={"leader"}
              character={null}
              action="threat"
              context="threat"
              id="threat-left-2"
            />
          </>
        )}
      </div>
      <div className={styles.actionSlots}>
        {props.threatCards.right && (
          <>
            <ActionSlot
              type={"leader"}
              character={null}
              action="threat"
              context="threat"
              id="threat-right-1"
            />
            <ActionSlot
              type={"leader"}
              character={null}
              action="threat"
              context="threat"
              id="threat-right-2"
            />
          </>
        )}
      </div>
    </div>
  );
}
