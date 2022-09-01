import React from "react";
import styles from "./Equipment.module.css";
import {
  IEquipment,
  IEquipmentRenderData,
} from "../../../../interfaces/Equipment/Equipment";
import Item from "./Item";

interface Props {
  equipment: IEquipmentRenderData;
}

export default function Equipment(props: Props) {
  return (
    <div className={styles.container}>
      {props.equipment.items.map((item) => {
        return <Item item={item} key={item.name} />;
      })}
    </div>
  );
}
