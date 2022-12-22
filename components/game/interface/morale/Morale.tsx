import Image from "next/image";
import React from "react";
import styles from "./Morale.module.css";
import MoraleBar from "./MoraleBar/MoraleBar";

interface Props {
  current: number;
}

export default function Morale(props: Props) {
  const moraleBars = [];

  for (let i = -3; i <= 3; i++) {
    moraleBars.push(
      <MoraleBar current={i === props.current} value={i} key={i} />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftBar}>
        <div className={styles.arrow}>
          <Image
            src="/interface/morale/arrow-left.png"
            fill
            sizes={styles.arrow}
            alt={"spadek morali"}
          />
        </div>
      </div>
      <div className={styles.rightBar}>
        <div className={styles.arrow}>
          <Image
            src="/interface/morale/arrow-right.png"
            fill
            sizes={styles.arrow}
            alt={"przypływ morali"}
          />
        </div>
      </div>
      <div className={styles.botBar}>{moraleBars}</div>
    </div>
  );
}
