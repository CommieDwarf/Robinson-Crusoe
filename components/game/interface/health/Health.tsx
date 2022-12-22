import Image from "next/image";
import React from "react";
import styles from "./Health.module.css";

interface Props {
  value: number;
  maxHealth: number;
  moraleThresholds: number[];
}

export default function Health(props: Props) {
  let marks: JSX.Element[] = [];

  for (let i = props.maxHealth; i > 0; i--) {
    const red = i === props.value ? "red-" : "";
    marks.push(
      <div className={styles.heart} key={i}>
        <Image
          src={"/interface/characters/" + red + "heart.png"}
          fill
          alt="serce"
          sizes={styles.heart}
        />
      </div>
    );
    if (props.moraleThresholds.includes(i - 1)) {
      marks.push(
        <div className={styles.arrow} key={i + 100}>
          <Image
            src="/interface/characters/arrow-left.png"
            fill
            alt="morale"
            sizes={styles.arrow}
          />
        </div>
      );
    }
  }
  marks.push(
    <div className={styles.skull} key={2137}>
      <Image
        src="/interface/characters/skull.png"
        fill
        alt="czaszka"
        sizes={styles.skull}
      />
    </div>
  );
  return (
    <div className={styles.container}>
      <div className={styles.health}>{marks}</div>
    </div>
  );
}
