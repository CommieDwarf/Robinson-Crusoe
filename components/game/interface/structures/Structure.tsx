import Image from "next/image";
import React from "react";
import styles from "./Structures.module.css";

export type structureType = "shelter" | "roof" | "palisade";

type Props = {
  type: structureType;
  level: number;
  woodCost: number;
  leatherCost: number;
  builder: boolean; // Na razie boolean, potem będzie null | obiekt gracza
  helper: boolean;
  commitedResources: {
    type: "wood" | "leather" | null;
    quantity: number;
  };
  locked: boolean;
};

export default function Structure(props: Props) {
  const resources = [];
  if (props.commitedResources.type) {
    for (let i = 0; i < props.commitedResources.quantity; i++) {
      resources.push(
        <div className={styles.resource} key={i}>
          <Image
            src={`/interface/resources/${props.commitedResources.type}.png`}
            layout="fill"
            alt={props.commitedResources.type}
          />
        </div>
      );
    }
  }

  const lockedClass = props.locked ? styles.locked : "";

  console.log(lockedClass);


  return (
    <div className={styles.structure}>
      <div className={styles.label}>Poziom {props.level}</div>
      <div className={styles.cost}>
        <div className={styles.costIcon}>
          <div className={styles.costTimber}>{props.woodCost}</div>
          <div className={styles.timber}>
            <Image src="/interface/resources/wood.png" layout="fill" />
          </div>
          <div className={styles.crossLine}></div>
          <div className={styles.costLeather}>{props.leatherCost}</div>
          <div className={styles.leather}>
            <Image src="/interface/resources/leather.png" layout="fill" />
          </div>
        </div>
      </div>
      <div className={styles.build}>
        <div className={styles.builderSlots}>
            { !props.locked && <>
                <div
                className={`${styles.slot} ${styles.slotHelper} ${props.helper && styles.cookIcon}`}
              ></div>
              <div
                className={`${styles.slot} ${styles.slotBuilder} ${props.builder && styles.cookIcon}`}
              ></div>
            </>
            }
        </div>
        <div className={styles.comitedResources}>{resources}</div>
      </div>
      <div
        className={`${styles[props.type]} ${props.level === 0 ? styles.level0 : ""}`}
      >
        <Image
          src={`/interface/structures/${props.type}.png`}
          layout="fill"
          alt={props.type}
        />
      </div>
      <div className={styles.icon}>
        <Image
          src={`/interface/structures/${props.type}-icon.png`}
          layout="fill"
          alt={props.type + " icon"}
        />
      </div>
    </div>
  );
}
