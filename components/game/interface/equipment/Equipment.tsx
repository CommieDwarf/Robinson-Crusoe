import React from "react";
import styles from "./Equipment.module.css";
import Item from "./Item";
import EquipmentClass from "../../../../server/Classes/Equipment/Equipment";

interface Props {
  equipment: EquipmentClass;
}

export default function Equipment(props: Props) {
  return (
    <div className={styles.container}>
      {props.equipment.equipmentItems.map((item) => {
        return <Item item={item} key={item.name} />;
      })}
    </div>
  );
}
