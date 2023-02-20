import React from "react";
import styles from "./ScenarioButton.module.css";
import Scenario from "./Scenario/Scenario";
import Image from "next/image";
import { IInventionRenderData } from "../../../../interfaces/InventionService/Invention";

import redArrowImg from "/public/UI/misc/red-arrow.png";
import { arraysEqual } from "../../../../utils/arraysEqual";

interface Props {
  inventions: IInventionRenderData[];
  zIndex: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  round: number;
}

function ScenarioButton(props: Props) {
  const zIndexClass = props.inventions.some((inv) =>
    props.zIndex.includes(inv.name)
  )
    ? styles.zIndexIncreased
    : "";

  function handleClick() {
    props.setShow((prev) => !prev);
  }

  const rotatedArrowClass = props.show ? styles.arrowRotated : "";

  return (
    <div className={`${styles.container} ${zIndexClass}`}>
      <Scenario
        zIndex={props.zIndex}
        inventions={props.inventions}
        show={props.show}
        setShow={props.setShow}
        round={props.round}
      />
      <div className={styles.button} onClick={handleClick}>
        <div className={styles.arrowWrapper}>
          <div className={`${styles.arrow} ${rotatedArrowClass}`}>
            <Image src={redArrowImg} fill alt="strzałka" sizes={styles.arrow} />
          </div>
        </div>
        <div className={styles.label}>
          Scenariusz: Rozbitkowie --- Tura: {props.round}
        </div>
        <div className={styles.arrowWrapper}>
          <div className={`${styles.arrow} ${rotatedArrowClass}`}>
            <Image src={redArrowImg} fill alt="strzałka" sizes={styles.arrow} />
          </div>
        </div>
      </div>
      )
    </div>
  );
}

function areEqual(prevProps: Props, nextProps: Props) {
  const oldZIndex = prevProps.inventions.some((inv) =>
    inv.name.includes(prevProps.zIndex)
  );

  const nextZIndex = nextProps.inventions.some((inv) =>
    inv.name.includes(prevProps.zIndex)
  );

  const inventionsEqual = arraysEqual(
    prevProps.inventions,
    nextProps.inventions
  );

  console.log("zIndex", oldZIndex, nextZIndex);
  console.log("inventions", inventionsEqual);

  return (
    oldZIndex === nextZIndex &&
    prevProps.show === nextProps.show &&
    prevProps.round === nextProps.round &&
    inventionsEqual
  );
}

export default React.memo(ScenarioButton, areEqual);
