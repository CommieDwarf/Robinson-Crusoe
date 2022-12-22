import Image from "next/image";
import React from "react";
import ActionSlot from "../../ActionSlot";
import styles from "./Structure.module.css";
import {
  IStructureRenderData,
  STRUCTURE,
} from "../../../../../interfaces/Structures/Structure";
import { IPawnRenderData } from "../../../../../interfaces/Pawns/Pawn";
import getHelperActionSlots from "../../../../../utils/getHelperActionSlots";

type Props = {
  structure: IStructureRenderData;
  actionSlots: Map<string, IPawnRenderData | null>;
  hideActionSlots?: boolean;
};

export default function Structure(props: Props) {
  const resources: JSX.Element[] = [];

  Object.entries(props.structure.committedResources).forEach(([key, value]) => {
    for (let i = 0; i < value; i++) {
      resources.push(
        <div className={styles.committedResource} key={key}>
          <Image
            src={`/interface/resources/${key}.png`}
            fill
            alt={key}
            sizes={styles.committedResource}
          />
        </div>
      );
    }
  });

  const lockedClass = props.structure.locked ? styles.locked : "";

  let costIcon;

  if (props.structure.name == STRUCTURE.WEAPON) {
    costIcon = (
      <div className={styles.costIcon}>
        <div className={styles.costWoodValue}>{props.structure.cost.wood}</div>
        <div className={styles.woodImage}>
          <Image
            src="/interface/resources/wood.png"
            fill
            alt={"wood"}
            sizes={styles.woodImage}
          />
        </div>
      </div>
    );
  } else {
    costIcon = (
      <div className={styles.costIcon}>
        <div className={styles.costWoodValue}>{props.structure.cost.wood}</div>
        <div className={styles.woodImage}>
          <Image
            src="/interface/resources/wood.png"
            fill
            alt={"drewno"}
            sizes={styles.woodImage}
          />
        </div>
        <div className={styles.crossLine}></div>
        <div className={styles.costLeatherValue}>
          {props.structure.cost.leather}
        </div>
        <div className={styles.leatherImage}>
          <Image
            src="/interface/resources/leather.png"
            fill
            alt={"skóra"}
            sizes={styles.leatherImage}
          />
        </div>
      </div>
    );
  }

  let leaderPawn = props.actionSlots.get(
    "structure-" + props.structure.name + "-leader-0"
  );
  leaderPawn = leaderPawn ? leaderPawn : null;

  let helperActionSlots = getHelperActionSlots(
    props.structure,
    props.actionSlots
  );

  return (
    <div className={styles.structure}>
      <div className={styles.lvlLabel}>Poziom {props.structure.lvl}</div>
      <div className={styles.cost}>{costIcon}</div>
      <div className={styles.build}>
        <div className={styles.actionSlots}>
          {!props.structure.locked && !props?.hideActionSlots && (
            <>
              {helperActionSlots}
              <ActionSlot
                type={"leader"}
                pawn={leaderPawn}
                action={"build"}
                context="structure"
                id={"structure-" + props.structure.name + "-leader-0"}
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
          fill
          alt={props.structure.name}
          sizes={`${styles[props.structure.name]} ${
            props.structure.lvl === 0 ? styles.level0 : ""
          }`}
        />
      </div>
      <div className={styles.structureIcon}>
        <Image
          src={`/interface/structures/${props.structure.name}-icon.png`}
          fill
          alt={props.structure.name + " icon"}
          sizes={styles.structureIcon}
        />
      </div>
    </div>
  );
}
