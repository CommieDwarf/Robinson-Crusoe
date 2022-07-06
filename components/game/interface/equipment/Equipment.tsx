import React from "react";
import styles from "./Equipment.module.css";
import Item from "./Item";


interface Props {
  equipment: string[];
}

export default function Equipment(props: Props) {

  
  return (
    <div className={styles.container}>
          <Item name={props.equipment[0]} uses={2}/>
          <Item name={props.equipment[1]} uses={2}/>
    </div>
  );
}
