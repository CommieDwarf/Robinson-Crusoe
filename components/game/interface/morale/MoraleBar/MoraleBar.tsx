import Image from "next/image";
import React from "react";
import styles from "./MoraleBar.module.css";

interface Props {
  current: boolean;
  value: number;
}

export default function MoraleBar(props: Props) {
  const moraleBar0Class = props.value == 0 ? styles.moraleBar0 : "";
  const moraleCurrentClass = props.current ? styles.current : "";

  if (props.value !== 3) {
    return (
      <div
        className={
          styles.moraleBar + " " + moraleBar0Class + " " + moraleCurrentClass
        }
      >
        <div className={styles.moraleLabel}>
          <div className={styles.moraleValue}>{props.value}</div>
          {props.value !== 0 && (
            <div className={styles.moraleIcon}>
              <Image
                src="/interface/morale/icon.png"
                layout="fill"
                alt="morale"
              />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={
          styles.moraleBar +
          " " +
          styles.lastMoraleBar +
          " " +
          moraleCurrentClass
        }
      >
        <div className={styles.moraleLabel}>
          <div className={styles.lastMoraleBarValue}>3</div>
          <div className={styles.lastMoraleIcon}>
            <Image
              src="/interface/morale/icon.png"
              layout="fill"
              alt="morale"
            />
          </div>
          <div className={styles.heart}>
            <Image
              src="/interface/morale/heart.png"
              layout={"fill"}
              alt="serce"
            />
          </div>
          <div className={styles.crossLine}></div>
        </div>
      </div>
    );
  }
}
