import React from "react";
import Structure from "./Structure/Structure";
import styles from "./Structures.module.css";
import {
  IStructure,
  IStructureRenderData,
} from "../../../../interfaces/Structures/Structure";
import { IPawn, IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";

interface Props {
  structures: IStructureRenderData[];
  actionSlots: Map<string, IPawnRenderData | null>;
  zIndex: string;
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

  let zIndexIncreasedClass = props.zIndex.includes("structure")
    ? styles.zIndexIncreased
    : "";

  return (
    <div className={styles.container + " " + zIndexIncreasedClass}>
      {structures}
    </div>
  );
}
