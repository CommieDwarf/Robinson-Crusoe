// @flow
import * as React from "react";

import styles from "../BasicResources/BasicResources.module.css";
import Image from "next/image";
import tokenImg from "public/UI/tokens/discovery/discovery-token.png";
import treasureImg from "public/UI/misc/treasure-modified.png";

type Props = {
  tokens: number;
  treasures: number;
};
export const AdditionalResources = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.resources}>
        <div className={styles.resource}>
          <div className={styles.icon}>
            <Image
              src={tokenImg}
              fill
              alt={"żeton odkryć"}
              sizes={styles.icon}
            />
          </div>
          <div className={styles.value}>{props.tokens}</div>
        </div>
        <div className={styles.resource}>
          <div className={`${styles.icon} ${styles.treasure}`}>
            <Image src={treasureImg} fill alt={"skarby"} sizes={styles.icon} />
          </div>
          <div className={styles.value}>{props.treasures}</div>
        </div>
      </div>
    </div>
  );
};
