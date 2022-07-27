// @flow
import * as React from "react";

import styles from "./WoodStack.module.css";
import Image from "next/image";

type Props = {
  stackLevel: number;
  committedWood: number;
  wood: number;
};
export const WoodStack = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.fire}>
        <Image
          src={"/interface/scenarios/fire.png"}
          layout={"fill"}
          alt={"ogień"}
        />
      </div>
      <div
        className={styles.woodStack + " " + styles["level" + props.stackLevel]}
      >
        <Image
          src={`/interface/scenarios/castaways/woodStack${props.stackLevel}.png`}
          layout={"fill"}
          alt={"stos drewna"}
        />
      </div>
      <div className={styles.title}>Stos {props.stackLevel}/5</div>

      <div className={styles.wood}>
        <div className={styles.woodButton + " " + styles.addWoodButton}>+</div>
        <div className={styles.woodImage}>
          <Image
            src={"/interface/resources/wood.png"}
            layout={"fill"}
            alt={"drewno"}
          />
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
