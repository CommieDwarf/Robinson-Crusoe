import Image from "next/image";
import React from "react";
import Pawn from "../../../../../interfaces/Pawn";
import IStructure from "../../../../../interfaces/Structure";
import ActionSlot from "../../ActionSlot";
import styles from "./Structure.module.css";

type Props = {
  structure: IStructure;
  actionSlots: Map<string, Pawn | null>;
};

export default function Structure(props: Props) {
  const resources = [];
  if (props.structure.committedResources.type) {
    for (let i = 0; i < props.structure.committedResources.quantity; i++) {
      resources.push(
        <div className={styles.committedResource} key={i}>
          <Image
            src={`/interface/resources/${props.structure.committedResources.type}.png`}
            layout="fill"
            alt={props.structure.committedResources.type}
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

  let leaderPawn = props.actionSlots.get(
    "structure" + props.structure.type + "leader"
  );
  leaderPawn = leaderPawn ? leaderPawn : null;
  let helperActionSlots = [];

  for (let i = 0; i < props.structure.requiredHelpers; i++) {
    const actionSlotId =
      "structure" + props.structure.type + "helper" + (i + 1);
    let helperPawn = props.actionSlots.get(actionSlotId);
    helperPawn = helperPawn ? helperPawn : null;
    helperActionSlots.push(
      <ActionSlot
        type={"helper"}
        pawn={helperPawn}
        action={"build"}
        context={"structure"}
        id={actionSlotId}
        key={actionSlotId}
      />
    );
  }

  return (
    <div className={styles.structure}>
      <div className={styles.lvlLabel}>Poziom {props.structure.level}</div>
      <div className={styles.cost}>{costIcon}</div>
      <div className={styles.build}>
        <div className={styles.actionSlots}>
          {!props.structure.locked && (
            <>
              {helperActionSlots}
              <ActionSlot
                type={"leader"}
                pawn={leaderPawn}
                action={"build"}
                context="structure"
                id={"structure" + props.structure.type + "leader"}
              />
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
