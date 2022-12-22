import Image from "next/image";
import React from "react";

import styles from "./Determination.module.css";

interface Props {
  value: number;
}

export default function Determination(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.token}>
        <div className={styles.value}>{props.value}</div>
        <div className={styles.image}>
          <Image
            src="/interface/characters/determination-token.png"
            fill
            alt="determination icon"
            sizes={styles.image}
          />
        </div>
      </div>
      <div className={styles.token}></div>
    </div>
  );
}
