// @flow
import * as React from "react";

import styles from "./WoodStack.module.css";
import Image from "next/image";

type Props = {};
export const WoodStack = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Stos 1/5</div>
      <div className={styles.woodStack}>
        <Image
          src={"/interface/scenarios/castaways/woodStack1.png"}
          layout={"fill"}
          alt={"stos drewna"}
        />
      </div>

      <div className={styles.wood}>
        <div className={styles.woodButton + " " + styles.addWoodButton}>+</div>
        <div className={styles.woodImage}>
          <Image
            src={"/interface/resources/wood.png"}
            layout={"fill"}
            alt={"drewno"}
          />
        </div>
        <div className={styles.woodAmount}>0/1</div>
        <div className={styles.woodButton + " " + styles.removeWoodButton}>
          -
        </div>
      </div>
    </div>
  );
};
