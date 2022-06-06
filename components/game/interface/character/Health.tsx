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

    let heart = <div className={styles.heart}>
        <Image src="/interface/characters/heart.png" layout="fill" alt="serce" />
    </div>

    let arrow = <div className={styles.arrow}>
        <Image src="/interface/characters/arrow-left.png" layout="fill" alt="morale" />
    </div>

    let skull = <div className={styles.skull}>
        <Image src="/interface/characters/skull.png" layout="fill" alt="czaszka" />
    </div>

    health.forEach((char) => {
        if (char === "h") {
            marks.push(heart);
        } else if (char === "m") {
            marks.push(arrow);
        } else {
            marks.push(skull);
        }
    })

  return <div className={styles.container}>
      <div className={styles.health}>
          {marks}
      </div>
  </div>;
}
