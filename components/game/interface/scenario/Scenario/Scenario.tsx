import styles from "./Scenario.module.css";

import React, { useEffect, useState } from "react";

import Castaways from "./Scenarios/Castaways/Castaways";
import {
  IInvention,
  IInventionRenderData,
} from "../../../../../interfaces/Inventions/Invention";
import { IPawn, IPawnRenderData } from "../../../../../interfaces/Pawns/Pawn";

interface Props {
  inventions: IInventionRenderData[];
  actionSlots: Map<string, IPawnRenderData | null>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  zIndex: string;
}

export default function Scenario(props: Props) {
  const hiddenClass = props.show ? "" : styles.hidden;

  return (
    <div className={styles.container + " " + hiddenClass}>
      <div className={styles.content}>
        <Castaways
          inventions={props.inventions}
          actionSlots={props.actionSlots}
          setShow={props.setShow}
          zIndex={props.zIndex}
        />
      </div>
    </div>
  );
}
