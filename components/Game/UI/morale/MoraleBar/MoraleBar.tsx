import Image from "next/image";
import React from "react";
import styles from "./MoraleBar.module.css";
import moraleIconImg from "/public/UI/icons/morale.png";
import heartImg from "/public/UI/misc/heart.png";

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
                src={moraleIconImg}
                fill
                alt="morale"
                sizes={styles.moraleIcon}
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
              src={moraleIconImg}
              fill
              alt="morale"
              sizes={styles.lastMoraleBar}
            />
          </div>
          <div className={styles.heart}>
            <Image src={heartImg} fill alt="życie" sizes={styles.heart} />
          </div>
          <div className={styles.crossLine}></div>
        </div>
      </div>
    );
  }
}
