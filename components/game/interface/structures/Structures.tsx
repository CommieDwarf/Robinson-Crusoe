import React from "react";
import Structure from "./Structure/Structure";
import styles from "./Structures.module.css";
import { IStructure } from "../../../../interfaces/Structures/Structure";
import { IPawn } from "../../../../interfaces/Pawns/Pawn";

interface Props {
  structures: IStructure[];
  actionSlots: Map<string, IPawn | null>;
  zIndexIncreased: Map<string, boolean>;
}

export default function Structures(props: Props) {
  const structures = [];
  for (let i = 0; i < 4; i++) {
    structures.push(
      <Structure
        structure={props.structures[i]}
        key={i}
        actionSlots={props.actionSlots}
      />
    );
  }

  let zIndexIncreasedClass = props.zIndexIncreased.get("structures")
    ? styles.zIndexIncreased
    : "";

  return (
    <div className={styles.container + " " + zIndexIncreasedClass}>
      {structures}
    </div>
  );
}
