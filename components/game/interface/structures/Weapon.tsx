import Image from "next/image";
import React from "react";
import styles from "./Structures.module.css";

type Props = {
  level: 0;
  woodCost: number;
  leatherCost: number;
  builder: boolean; // Na razie boolean, potem będzie null | obiekt gracza
  helper: boolean;
  commitedResources: {
    type: "wood" | "leather" | null;
    quantity: number;
  };
};

export default function Weapon(props: Props) {

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



  return (
    <div className={styles.structure}>
      <div className={styles.label}>Poziom {props.level}</div>
      <div className={styles.cost}>
        <div className={styles.costIcon}>
          <div className={styles.costTimber}>1</div>
          <div className={styles.timber}>
            <Image src="/interface/resources/wood.png" layout="fill" />
          </div>
          
        </div>
      </div>
      <div className={styles.build}>
        <div className={styles.builderSlots}>
          <div
            className={`${styles.slot} ${styles.slotHelper} ${styles.cookIcon}`}
          ></div>
          <div
            className={`${styles.slot} ${styles.slotBuilder} ${styles.cookIcon}`}
          ></div>
        </div>
        <div className={styles.comitedResources}>{resources}</div>
      </div>
      <div className={styles.weapon}>
        <Image
          src={`/interface/structures/weapon.png`}
          layout="fill"
          alt="weapon"
        />
      </div>
      <div className={styles.icon}>
      <Image
          src="/interface/structures/weapon-icon.png"
          layout="fill"
          alt="weapon icon"
        />
      </div>
    </div>
  );
}
