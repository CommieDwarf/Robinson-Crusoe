import React from "react";
import styles from "./ScenarioButton.module.css";
import Scenario from "./Scenario/Scenario";
import IInvention from "../../../../interfaces/Inventions/Invention";
import Pawn from "../../../../interfaces/Pawns/Pawn";
import Image from "next/image";

interface Props {
  inventions: IInvention[];
  actionSlots: Map<string, Pawn | null>;
  zIndexIncreased: Map<string, boolean>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ScenarioButton(props: Props) {
  const zIndexClass = props.zIndexIncreased ? styles.zIndexIncreased : "";

  function handleHide() {
    props.setShow(false);
  }

  function handleShow() {
    props.setShow((prev) => !prev);
  }

  const rotatedArrowClass = props.show ? styles.arrowRotated : "";

  return (
    <div className={styles.container + " " + zIndexClass}>
      <Scenario
        inventions={props.inventions}
        actionSlots={props.actionSlots}
        show={props.show}
        zIndexIncreased={props.zIndexIncreased}
        setShow={props.setShow}
      />
      <div className={styles.button} onClick={handleShow}>
        <div className={styles.arrowWrapper}>
          <div className={styles.arrow + " " + rotatedArrowClass}>
            <Image
              src="/interface/cards/red-arrow.png"
              layout="fill"
              alt="strzałka"
            />
          </div>
        </div>
        <div className={styles.label}>Scenariusz: Rozbitkowie --- Tura: 2</div>
        <div className={styles.arrowWrapper}>
          <div className={styles.arrow + " " + rotatedArrowClass}>
            <Image
              src="/interface/cards/red-arrow.png"
              layout="fill"
              alt="strzałka"
            />
          </div>
        </div>
      </div>
      )
    </div>
  );
}
