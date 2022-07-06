import Image from "next/image";
import React, { createRef, useState } from "react";
import IInvention from "../../../../../interfaces/Invention";
import Pawn from "../../../../../interfaces/Pawn";
import ActionSlot from "../../ActionSlot";
import styles from "./Invention.module.css";
import getHelperActionSlots from "../../../../../utils/getHelperActionSlots";

type Props = {
  invention: IInvention;
  column: number;
  row: number;
  top: number;
  actionSlots: Map<string, Pawn | null>;
  zIndexIncreased: boolean | undefined;
};

export default function Invention(props: Props) {
  const [enlarge, setEnlarge] = useState(false);

  const inventionRef = React.createRef<HTMLDivElement>();

  function handleClick() {
    if(!props.zIndexIncreased) {
      setEnlarge((prev) => !prev);
    }
  }

  const wrapperStyle = {
    left: props.column * 95,
    top: props.row * 140,
  };

  const enlargedClass = enlarge ? styles.inventionEnlarged : "";

  wrapperStyle.top = enlarge ? props.top + 10 : wrapperStyle.top;
  wrapperStyle.left = enlarge ? 60 : wrapperStyle.left;

  const lockedClass = props.invention.locked ? styles.inventionLocked : "";

  const resources = [];

  for (let i = 0; i < props.invention.commitedResources.quantity; i++) {
    resources.push(
      <div className={styles.resource} key={i}>
        <Image
          src={`/interface/resources/${props.invention.commitedResources.type}.png`}
          layout="fill"
          alt="surowiec"
        />
      </div>
    );
  }

  const leaderId = "invention-" + props.invention.name + "-leader";
  let leaderPawn = props.actionSlots.get(leaderId);
  leaderPawn = leaderPawn ? leaderPawn : null; 

  const zIndexClass = props.zIndexIncreased ? styles.zIndexIncreased : "";

  if(zIndexClass) {
    console.log('Z INDEX')
  }
  return (
    <div
      ref={inventionRef}
      className={`${styles.invention} ${lockedClass} ${enlargedClass} ${zIndexClass}`}
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
        alt={props.invention.name + " invention"}
      />
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
      <div className={styles.commitedResources}>{resources}</div>
    </div>
  );
}
