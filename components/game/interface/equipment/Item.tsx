import React, { useState } from "react";
import styles from "./Equipment.module.css";
import Image from "next/image";
import { IItemRenderData } from "../../../../interfaces/Equipment/Item";

interface Props {
  item: IItemRenderData;
}

export default function Item(props: Props) {
  const [enlarged, setEnlarged] = useState(false);

  function handleClick() {
    setEnlarged((prev) => !prev);
  }

  const enlargedClass = enlarged ? styles.itemEnlarged : "";
  const buttonClass = enlarged ? styles.useButtonVisible : "";

  return (
    <div className={styles.item + " " + enlargedClass} onClick={handleClick}>
      <Image
        src={`/interface/equipment/${props.item.name}.png`}
        layout="fill"
        alt={props.item.name}
      />
      <div className={styles.useButton + " " + buttonClass}>Użyj</div>
      <div className={styles.uses}>
        <div className={styles.useMark}></div>
        <div className={styles.useMark}></div>
      </div>
    </div>
  );
}
