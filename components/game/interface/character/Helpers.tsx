import Image from "next/image";
import React from "react";
import styles from "./Helpers.module.css";

export default function Helpers() {
  return (
    <div className={styles.container}>
      <div className={styles.friday}>
        <div className={styles.pawn}>

        </div>
        <div className={`${styles.name} ${styles["friday-name"]}`}>Piętaszek</div>
        <div className={styles.health}>
          <div className={styles.heart}>
            <Image src="/interface/characters/red-heart.png" layout="fill" alt="heart"/>
          </div>
          <div className={styles.heart}>
            <Image src="/interface/characters/heart.png" layout="fill" alt="heart"/>
          </div>
          <div className={styles.heart}>
            <Image src="/interface/characters/heart.png" layout="fill" alt="heart"/>
          </div>
          <div className={styles.heart}>
            <Image src="/interface/characters/heart.png" layout="fill" alt="heart"/>
          </div>
          <div className={styles.skull}>
          <Image src="/interface/characters/skull.png" layout="fill" alt="skull"/>
          </div>
          </div>
        <div className={styles.picture}>
            <Image src="/interface/characters/friday-pic.png" layout="fill" alt="piętaszek"/>
        </div>
        
      </div>
      <div className={styles.dog}>
      <div className={styles.pawn}>
          
          </div>
        <div className={`${styles.name}`}>Pies</div>
        <div className={styles["dog-usage"]}>
          <Image src="/interface/characters/dog-usage.png" layout="fill" alt="umiejetności psa" />
        </div>
        <div className={`${styles.picture} ${styles["dog-pic"]}`}>
          <Image src="/interface/characters/dog-pic.png" layout="fill" alt="pies" />
        </div>
      </div>
    </div>
  );
}
