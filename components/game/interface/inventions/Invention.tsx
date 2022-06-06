import Image from "next/image";
import React from "react";
import styles from "./Inventions.module.css";

type Props = {
  name: string;
  type: "normal" | "starter" | "personal";
  locked: boolean;
};

export default function Invention(props: Props) {

  const lockedClass = props.locked ? "locked" : "";

  return (
    <div className={`${styles.invention} ${styles[lockedClass]}`}>
      <Image
        src={"/interface/inventions/" + props.type + "/" + props.name + ".png"}
        layout="fill"
        alt={props.name + " invention"}
      />
    </div>
  );
}
