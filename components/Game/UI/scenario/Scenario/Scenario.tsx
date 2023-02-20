import styles from "./Scenario.module.css";

import React from "react";

import Castaways from "./Scenarios/Castaways/Castaways";
import { IInventionRenderData } from "../../../../../interfaces/InventionService/Invention";

interface Props {
  inventions: IInventionRenderData[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  zIndex: string;
  round: number;
}

export default function Scenario(props: Props) {
  const hiddenClass = props.show ? "" : styles.hidden;

  return (
    <div className={styles.container + " " + hiddenClass}>
      <div className={styles.content}>
        <Castaways
          inventions={props.inventions}
          setShow={props.setShow}
          zIndex={props.zIndex}
          round={props.round}
        />
      </div>
    </div>
  );
}
