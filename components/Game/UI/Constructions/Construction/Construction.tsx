import Image from "next/image";
import React from "react";
import ActionSlot from "../../ActionSlot";
import styles from "./Construction.module.css";
import {
  IConstructionRenderData,
  CONSTRUCTION,
} from "../../../../../interfaces/ConstructionService/Construction";
import { IPawnRenderData } from "../../../../../interfaces/Pawns/Pawn";
import getHelperActionSlots from "../../../../../utils/getHelperActionSlots";
import { ACTION } from "../../../../../interfaces/ACTION";
import { ACTION_ITEM } from "../../../../../utils/getDroppableID";
import woodImg from "/public/UI/resources/wood.png";
import leatherImg from "/public/UI/resources/leather.png";

type Props = {
  construction: IConstructionRenderData;
  actionSlots: Map<string, IPawnRenderData | null>;
  hideActionSlots?: boolean;
};

export default function Construction(props: Props) {
  const resources: JSX.Element[] = [];

  Object.entries(props.construction.committedResources).forEach(
    ([key, value]) => {
      for (let i = 0; i < value; i++) {
        resources.push(
          <div className={styles.committedResource} key={key}>
            <Image
              src={`/UI/resources/${key}.png`}
              fill
              alt={key}
              sizes={styles.committedResource}
            />
          </div>
        );
      }
    }
  );

  const lockedClass = props.construction.locked ? styles.locked : "";

  let costIcon;

  if (props.construction.name == CONSTRUCTION.WEAPON) {
    costIcon = (
      <div className={styles.costIcon}>
        <div className={styles.costWoodValue}>
          {props.construction.cost.wood}
        </div>
        <div className={styles.woodImage}>
          <Image src={woodImg} fill alt={"wood"} sizes={styles.woodImage} />
        </div>
      </div>
    );
  } else {
    costIcon = (
      <div className={styles.costIcon}>
        <div className={styles.costWoodValue}>
          {props.construction.cost.wood}
        </div>
        <div className={styles.woodImage}>
          <Image src={woodImg} fill alt={"drewno"} sizes={styles.woodImage} />
        </div>
        <div className={styles.crossLine}></div>
        <div className={styles.costLeatherValue}>
          {props.construction.cost.leather}
        </div>
        <div className={styles.leatherImage}>
          <Image
            src={leatherImg}
            fill
            alt={"skóra"}
            sizes={styles.leatherImage}
          />
        </div>
      </div>
    );
  }

  let leaderPawn = props.actionSlots.get(
    "construction-" + props.construction.name + "-leader-0"
  );
  leaderPawn = leaderPawn ? leaderPawn : null;

  let helperActionSlots = getHelperActionSlots(
    props.construction,
    props.actionSlots
  );

  return (
    <div className={styles.construction}>
      <div className={styles.lvlLabel}>Poziom {props.construction.lvl}</div>
      <div className={styles.cost}>{costIcon}</div>
      <div className={styles.build}>
        <div className={styles.actionSlots}>
          {!props.construction.locked && !props?.hideActionSlots && (
            <>
              {helperActionSlots}
              <ActionSlot
                type={"leader"}
                pawn={leaderPawn}
                action={ACTION.BUILD}
                context={ACTION_ITEM.CONSTRUCTION}
                id={"construction-" + props.construction.name + "-leader-0"}
              />
            </>
          )}
        </div>
        <div className={styles.committedResources}>{resources}</div>
      </div>
      <div
        className={`${styles[props.construction.name]} ${
          props.construction.lvl === 0 ? styles.level0 : ""
        }`}
      >
        <Image
          src={`/UI/constructions/${props.construction.name}.png`}
          fill
          alt={props.construction.name}
          sizes={`${styles[props.construction.name]} ${
            props.construction.lvl === 0 ? styles.level0 : ""
          }`}
        />
      </div>
      <div className={styles.structureIcon}>
        <Image
          src={`/UI/constructions/${props.construction.name}-icon.png`}
          fill
          alt={props.construction.name + " icon"}
          sizes={styles.structureIcon}
        />
      </div>
    </div>
  );
}
