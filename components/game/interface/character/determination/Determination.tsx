import Image from "next/image";
import React from "react";


import styles from "./Determination.module.css";

export default function Determination() {
  return (
    <div className={styles.container}>
      <div className={styles.token}>
        <div className={styles.value}>10</div>
        <div className={styles.image}>
          <Image
            src="/interface/characters/determination-token.png"
            layout="fill"
            alt="determination icon"
          />
        </div>
      </div>
      <div className={styles.token}></div>
    </div>
  );
}
