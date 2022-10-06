import React from "react";
import styles from "./ScenarioButton.module.css";
import Scenario from "./Scenario/Scenario";
import Image from "next/image";
import {
  IInvention,
  IInventionRenderData,
} from "../../../../interfaces/Inventions/Invention";
import {IPawn, IPawnRenderData} from "../../../../interfaces/Pawns/Pawn";

interface Props {
  inventions: IInventionRenderData[];
  actionSlots: Map<string, IPawnRenderData | null>;
  zIndex: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ScenarioButton(props: Props) {
  const zIndexClass = props.inventions.some((inv) =>
      props.zIndex.includes(inv.name)
  )
      ? styles.zIndexIncreased
      : "";


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
            zIndex={props.zIndex}
            inventions={props.inventions}
            actionSlots={props.actionSlots}
            show={props.show}
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
