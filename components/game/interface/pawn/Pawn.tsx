import Image from 'next/image';
import React from 'react'
import styles from "./Pawn.module.css";

export default function Pawn() {


    const top = "blue";
    const bot = "blue";

  return (
      <div className={styles.pawnTower}>
        <div className={`${styles["icon1"]} ${styles["icon"]}`}>
            <Image src="/interface/players/cookMaleIcon.png" layout="fill"/>
        </div>  
        <div className={`${styles.pawn} ${styles["pawn1"]}`}>
            <Image src="/interface/players/bluePawn.png" layout="fill"/>
        </div>
        <div className={`${styles.pawn} ${styles["pawn0"]}`}>
            <Image src="/interface/players/bluePawn.png" layout="fill"/>
        </div>
      </div>
  )
}
