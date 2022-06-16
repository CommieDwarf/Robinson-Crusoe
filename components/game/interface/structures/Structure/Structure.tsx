import Image from "next/image";
import React from "react";
import IStructure, { structureType } from "../../../../../interfaces/Structure";
import ActionSlot from "../../ActionSlot";
import styles from "./Structure.module.css";

type Props = {
  structure: IStructure;
};

export default function Structure(props: Props) {
  const resources = [];
  if (props.structure.commitedResources.type) {
    for (let i = 0; i < props.structure.commitedResources.quantity; i++) {
      resources.push(
        <div className={styles.commitedResource} key={i}>
          <Image
            src={`/interface/resources/${props.structure.commitedResources.type}.png`}
            layout="fill"
            alt={props.structure.commitedResources.type}
          />
        </div>
      );
    }
  }

  const lockedClass = props.structure.locked ? styles.locked : "";

  let costIcon;

  if (props.structure.type == "weapon") {
    costIcon = (
      <div className={styles.costIcon}>
        <div className={styles.costWoodValue}>{props.structure.woodCost}</div>
        <div className={styles.woodImage}>
          <Image src="/interface/resources/wood.png" layout="fill" />
        </div>
      </div>
    );
  } else {
    costIcon = (
      <div className={styles.costIcon}>
        <div className={styles.costWoodValue}>{props.structure.woodCost}</div>
        <div className={styles.woodImage}>
          <Image src="/interface/resources/wood.png" layout="fill" />
        </div>
        <div className={styles.crossLine}></div>
        <div className={styles.costLeatherValue}>
          {props.structure.leatherCost}
        </div>
        <div className={styles.leatherImage}>
          <Image src="/interface/resources/leather.png" layout="fill" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.structure}>
      <div className={styles.lvlLabel}>Poziom {props.structure.level}</div>
      <div className={styles.cost}>{costIcon}</div>
      <div className={styles.build}>
        <div className={styles.builderSlots}>
          {!props.structure.locked && (
            <>
              <ActionSlot type={"helper"} character={null} action={"build"} size={{width: "33%", height: "100%"}} />
              <ActionSlot type={"leader"} character={null} action={"build"} size={{width: "33%", height: "100%"}} />
            </>
          )}
        </div>
        <div className={styles.comitedResources}>{resources}</div>
      </div>
      <div
        className={`${styles[props.structure.type]} ${
          props.structure.level === 0 ? styles.level0 : ""
        }`}
      >
        <Image
          src={`/interface/structures/${props.structure.type}.png`}
          layout="fill"
          alt={props.structure.type}
        />
      </div>
      <div className={styles.structureIcon}>
        <Image
          src={`/interface/structures/${props.structure.type}-icon.png`}
          layout="fill"
          alt={props.structure.type + " icon"}
        />
      </div>
    </div>
  );
}
