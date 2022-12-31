// @flow
import * as React from "react";

import styles from "./WoodStack.module.css";
import Image from "next/image";
import fireImg from "/public/UI/scenarios/fire.png";
import woodImg from "/public/UI/resources/wood.png";

type Props = {
  stackLevel: number;
  committedWood: number;
  wood: number;
};
export const WoodStack = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.fire}>
        <Image src={fireImg} fill alt={"ogień"} sizes={styles.fire} />
      </div>
      <div
        className={`${styles.woodStack} ${styles["level" + props.stackLevel]}`}
      >
        <Image
          src={`/UI/scenarios/castaways/woodStack${props.stackLevel}.png`}
          fill
          sizes={styles.woodStack}
          alt={"stos drewna"}
        />
      </div>
      <div className={styles.title}>Stos {props.stackLevel}/5</div>

      <div className={styles.wood}>
        <div className={styles.woodButton + " " + styles.addWoodButton}>+</div>
        <div className={styles.woodImage}>
          <Image src={woodImg} fill alt={"drewno"} sizes={styles.woodImage} />
        </div>
        <div className={styles.woodAmount}>
          {props.committedWood + props.wood}/{props.stackLevel}
        </div>
        <div className={styles.woodButton + " " + styles.removeWoodButton}>
          -
        </div>
      </div>
    </div>
  );
};
