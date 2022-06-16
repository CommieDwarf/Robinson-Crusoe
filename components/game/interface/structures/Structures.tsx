import React from "react";
import Structure from "./Structure/Structure";
import styles from "./Structures.module.css";
import IStructure from "../../../../interfaces/Structure";

interface Props {
  structures: IStructure[]
}

export default function Structures(props: Props) {

  const structures = [];
  for (let i = 0; i < 4; i ++) {
    structures.push( (
        <Structure
          structure={props.structures[i]}
          key={i}
        />
      ))
    }

  

  return (
    <div className={styles.container}>
      {structures}
    </div>
  );
}
