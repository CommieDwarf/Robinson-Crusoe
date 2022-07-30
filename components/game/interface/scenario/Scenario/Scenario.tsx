import styles from "./Scenario.module.css";

import React, { useEffect, useState } from "react";

import Castaways from "./Scenarios/Castaways/Castaways";
import IInvention from "../../../../../interfaces/Invention";
import Pawn from "../../../../../interfaces/Pawn";

interface Props {
  inventions: IInvention[];
  actionSlots: Map<string, Pawn | null>;
  show: boolean;
  zIndexIncreased: Map<string, boolean>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Scenario(props: Props) {
  const hiddenClass = props.show ? "" : styles.hidden;

  return (
    <div className={styles.container + " " + hiddenClass}>
      <div className={styles.content}>
        <Castaways
          inventions={props.inventions}
          actionSlots={props.actionSlots}
          zIndexIncreased={props.zIndexIncreased}
          setShow={props.setShow}
        />
      </div>
    </div>
  );
}
