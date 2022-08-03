import Image from "next/image";
import React from "react";
import Pawn from "../../../../../interfaces/Pawns/Pawn";
import IStructure, {
  STRUCTURE_NAMES,
} from "../../../../../interfaces/Structures/Structure";
import ActionSlot from "../../ActionSlot";
import styles from "./Structure.module.css";

type Props = {
  structure: IStructure;
  actionSlots: Map<string, Pawn | null>;
};

export default function Structure(props: Props) {
  const resources: JSX.Element[] = [];

  props.structure.committedResources.amount.forEach((value, key) => {
    for (let i = 0; i < value; i++) {
      resources.push(
        <div className={styles.committedResource} key={key}>
          <Image
            src={`/interface/resources/${key}.png`}
            layout="fill"
            alt={key}
          />
        </div>
      );
    }
  });

  const lockedClass = props.structure.locked ? styles.locked : "";

  let costIcon;

  if (props.structure.name == STRUCTURE_NAMES.WEAPON) {
    costIcon = (
      <div className={styles.costIcon}>
        <div className={styles.costWoodValue}>
          {props.structure.cost.getResource("wood")}
        </div>
        <div className={styles.woodImage}>
          <Image
            src="/interface/resources/wood.png"
            layout="fill"
            alt={"wood"}
          />
        </div>
      </div>
    );
  } else {
    costIcon = (
      <div className={styles.costIcon}>
        <div className={styles.costWoodValue}>
          {props.structure.cost.getResource("wood")}
        </div>
        <div className={styles.woodImage}>
          <Image
            src="/interface/resources/wood.png"
            layout="fill"
            alt={"drewno"}
          />
        </div>
        <div className={styles.crossLine}></div>
        <div className={styles.costLeatherValue}>
          {props.structure.cost.getResource("leather")}
        </div>
        <div className={styles.leatherImage}>
          <Image
            src="/interface/resources/leather.png"
            layout="fill"
            alt={"drewno"}
          />
        </div>
      </div>
    );
  }

  let leaderPawn = props.actionSlots.get(
    "structure" + props.structure.name + "leader"
  );
  leaderPawn = leaderPawn ? leaderPawn : null;
  let helperActionSlots = [];

  for (let i = 0; i < props.structure.requiredHelpers; i++) {
    const actionSlotId =
      "structure" + props.structure.name + "helper" + (i + 1);
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
      <div className={styles.lvlLabel}>Poziom {props.structure.lvl}</div>
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
                id={"structure" + props.structure.name + "leader"}
              />
            </>
          )}
        </div>
        <div className={styles.committedResources}>{resources}</div>
      </div>
      <div
        className={`${styles[props.structure.name]} ${
          props.structure.lvl === 0 ? styles.level0 : ""
        }`}
      >
        <Image
          src={`/interface/structures/${props.structure.name}.png`}
          layout="fill"
          alt={props.structure.name}
        />
      </div>
      <div className={styles.structureIcon}>
        <Image
          src={`/interface/structures/${props.structure.name}-icon.png`}
          layout="fill"
          alt={props.structure.name + " icon"}
        />
      </div>
    </div>
  );
}
