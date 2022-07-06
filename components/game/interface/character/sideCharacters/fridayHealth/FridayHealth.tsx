import Image from "next/image";
import React from "react";
import styles from "./FridayHealth.module.css";

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
          <Image
            src="/interface/characters/red-heart.png"
            layout="fill"
            alt="heart"
          />
        </div>
      );
    } else {
      hearts.push(
        <div className={styles.heart} key={i}>
          <Image
            src="/interface/characters/heart.png"
            layout="fill"
            alt="heart"
          />
        </div>
      );
    }
  }

  

  return (
    <div className={styles.health}>
      {hearts}
      <div className={styles.skull}>
        <Image
          src="/interface/characters/skull.png"
          layout="fill"
          alt="skull"
        />
      </div>
    </div>
  );
}
