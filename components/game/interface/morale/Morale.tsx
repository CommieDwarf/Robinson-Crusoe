import Image from "next/image";
import React, { useRef } from "react";
import styles from "./Morale.module.css";

const heartImgAspectRatio = 258 / 176;

const heartHeight = 30;
const heartWidth = heartImgAspectRatio * heartHeight;

export default function Morale() {
  const moraleBars = [];

  for (let i = -3; i < 3; i++) {
    if (i == 0) {
      moraleBars.push(
        <div className={styles["morale-bar-0"]}>
          <div className={styles["morale-label"]}>
            <div className={styles["morale-value"]}>{i}</div>
          </div>
        </div>
      );
      continue;
    }
    moraleBars.push(
      <div className={styles["morale-bar"]}>
        <div className={styles["morale-label"]}>
          <div className={styles["morale-value"]}>{i}</div>
          <div className={styles["morale-icon"]}>
            <Image src="/interface/morale/icon.png" layout="fill" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles["left-bar"]}>
        <div className={styles["arrow"]}>
          <Image src="/interface/morale/arrow-left.png" layout="fill" />
        </div>
      </div>
      <div className={styles["right-bar"]}>
        <div className={styles["arrow"]}>
          <Image src="/interface/morale/arrow-right.png" layout="fill" />
        </div>
      </div>
      <div className={styles["bot-bar"]}>
        {moraleBars}
        <div className={styles["morale-bar"] + " " + styles["morale-bar--last"]}>
          <div className={styles["morale-label"]}>
            <div className={styles["morale-lastValue"]}>3</div>
            <div className={styles["morale-lastIcon"]}>
              <Image src="/interface/morale/icon.png" layout="fill" />
            </div>
            <div className={styles["morale-lastHeart"]}>
              <Image src="/interface/morale/heart.png" height={heartHeight} width={heartWidth}/>
            </div>
            <div className={styles["cross-line"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
