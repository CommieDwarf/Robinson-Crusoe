import Image from "next/image";
import React, { useState } from "react";
import ActionSlot from "../../ActionSlot";
import styles from "./Invention.module.css";
import getHelperActionSlots from "../../../../../utils/getHelperActionSlots";
import { IInvention } from "../../../../../interfaces/Inventions/Invention";
import { IPawn } from "../../../../../interfaces/Pawns/Pawn";

type Props = {
  invention: IInvention;
  column: number;
  row: number;
  top: number;
  actionSlots: Map<string, IPawn | null>;
  zIndexIncreased: boolean | undefined;
};

export default function Invention(props: Props) {
  const [enlarge, setEnlarge] = useState(false);

  const inventionRef = React.createRef<HTMLDivElement>();

  function handleClick() {
    if (!props.zIndexIncreased) {
      setEnlarge((prev) => !prev);
    }
  }

  const wrapperStyle = {
    left: props.column * 95,
    top: props.row * 140,
  };

  const enlargedClass = enlarge
    ? styles.inventionEnlarged
    : styles.zIndexTransition;

  wrapperStyle.top = enlarge ? props.top + 10 : wrapperStyle.top;
  wrapperStyle.left = enlarge ? 60 : wrapperStyle.left;

  const resources: JSX.Element[] = [];

  props.invention.committedResources.amount.forEach((value, key) => {
    for (let i = 0; i < value; i++) {
      resources.push(
        <div className={styles.resource} key={value}>
          <Image
            src={`/interface/resources/${key}.png`}
            layout="fill"
            alt="surowiec"
          />
        </div>
      );
    }
  });

  const leaderId = "invention-" + props.invention.name + "-leader";
  let leaderPawn = props.actionSlots.get(leaderId);
  leaderPawn = leaderPawn ? leaderPawn : null;

  const zIndexClass = props.zIndexIncreased ? styles.zIndexIncreased : "";

  if (zIndexClass) {
  }
  return (
    <div
      ref={inventionRef}
      className={`${styles.invention} ${enlargedClass} ${zIndexClass}`}
      onClick={handleClick}
      style={wrapperStyle}
    >
      <Image
        src={
          "/interface/inventions/" +
          props.invention.type +
          "/" +
          props.invention.name +
          ".png"
        }
        layout="fill"
        alt={"karta pomysłu"}
      />
      {!props.invention.locked && (
        <div className={styles.actionSlots}>
          {getHelperActionSlots(props.invention, props.actionSlots)}
          <ActionSlot
            type="leader"
            pawn={leaderPawn}
            action="build"
            context="invention"
            id={leaderId}
          />
        </div>
      )}
      <div className={styles.committedResources}>{resources}</div>
    </div>
  );
}
