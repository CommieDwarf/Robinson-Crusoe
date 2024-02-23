import Image from "next/image";
import React from "react";
import styles from "./FridayHealth.module.css";
import redHeartImg from "/public/UI/icons/red-heart.png";
import heartImg from "/public/UI/icons/heart.png";

interface Props {
  health: number;
}

export default function FridayHealth(props: Props) {
  const totalHealth = 4;

  const hearts = [];

  for (let i = 0; i < totalHealth; i++) {
    if (props.health === i) {
      hearts.push(
        <div className={styles.heart} key={i}>
          <Image src={redHeartImg} fill alt="heart" sizes={styles.heart} />
        </div>
      );
    } else {
      hearts.push(
        <div className={styles.heart} key={i}>
          <Image src={heartImg} fill alt="heart" sizes={styles.heart} />
        </div>
      );
    }
  }

  return (
    <div className={styles.health}>
      {hearts}
      <div className={styles.skull}>
        <Image src="/UI/misc/skull.png" fill alt="skull" sizes={styles.skull} />
      </div>
    </div>
  );
}

