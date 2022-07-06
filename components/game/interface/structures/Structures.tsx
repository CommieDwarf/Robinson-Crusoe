import React from "react";
import Structure from "./Structure/Structure";
import styles from "./Structures.module.css";
import IStructure from "../../../../interfaces/Structure";
import Pawn from "../../../../interfaces/Pawn";

interface Props {
  structures: IStructure[];
  actionSlots: Map<string, Pawn | null>;
}

export default function Structures(props: Props) {

  const structures = [];
  for (let i = 0; i < 4; i ++) {
    structures.push( (
        <Structure
          structure={props.structures[i]}
          key={i}
          actionSlots={props.actionSlots}
        />
      ))
    }

  

  return (
    <div className={styles.container}>
      {structures}
    </div>
  );
}
