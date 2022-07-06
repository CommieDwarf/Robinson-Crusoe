import Image from "next/image";
import React from "react";
import styles from "./Health.module.css";

const health = [
  "h",
  "h",
  "h",
  "h",
  "m",
  "h",
  "h",
  "h",
  "m",
  "h",
  "h",
  "m",
  "h",
  "h",
  "m",
  "h",
  "h",
  "d",
];

export default function Health() {
  let marks: JSX.Element[] = [];

  health.forEach((char, i) => {
    if (char === "h") {
      marks.push(
        <div className={styles.heart} key={i}>
          <Image
            src="/interface/characters/heart.png"
            layout="fill"
            alt="serce"
          />
        </div>
      );
    } else if (char === "m") {
      marks.push(
        <div className={styles.arrow} key={i}>
          <Image
            src="/interface/characters/arrow-left.png"
            layout="fill"
            alt="morale"
          />
        </div>
      );
    } else {
      marks.push(
        <div className={styles.skull} key={i}>
          <Image
            src="/interface/characters/skull.png"
            layout="fill"
            alt="czaszka"
          />
        </div>
      );
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.health}>{marks}</div>
    </div>
  );
}
