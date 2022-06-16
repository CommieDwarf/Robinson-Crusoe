import Image from "next/image";
import React, { createRef, useState } from "react";
import ActionSlot from "../../ActionSlot";
import styles from "./Invention.module.css";

type Props = {
  name: string;
  type: "normal" | "starter" | "personal";
  locked: boolean;
  column: number;
  row: number;
  top: number;
};

export default function Invention(props: Props) {

  const [enlarge, setEnlarge] = useState(false);
  
  const wrapper = React.createRef<HTMLDivElement>();

  

  function handleClick() {
    setEnlarge((prev) => !prev);
  }

  const wrapperStyle = {
    left: props.column * 95,
    top: props.row * 140,
  }

  const wrapperEnlargeClass = enlarge ? styles.inventionWrapperEnlarged : ""  

  wrapperStyle.top = enlarge ? props.top + 70 : wrapperStyle.top;
  wrapperStyle.left = enlarge ? 100 : wrapperStyle.left;

  const lockedWrapperClass = props.locked ? styles.wrapperLocked : "";

  const actionSlotSize = {
    width: "33%",
    height: "100%",
  }

  return (
    <div
      ref={wrapper}
      className={`${styles.inventionWrapper} ${lockedWrapperClass} ${wrapperEnlargeClass}`}
      onClick={handleClick}
      style={wrapperStyle}
    >
      <div className={styles.invention}>
        <Image
          src={
            "/interface/inventions/" + props.type + "/" + props.name + ".png"
          }
          layout="fill"
          alt={props.name + " invention"}
        />
        <div className={styles.actionSlots}>
          <ActionSlot type="helper" character={null} action="build" size={actionSlotSize} />
          <ActionSlot type="leader" character={null} action="build" size={actionSlotSize} />
        </div>
      </div>
    </div>
  );
}
