import Image from "next/image";
import React, { useState } from "react";
import ActionSlot from "../../ActionSlot";
import styles from "./Invention.module.css";
import getHelperActionSlots from "../../../../../utils/getHelperActionSlots";
import { IPawn, IPawnRenderData } from "../../../../../interfaces/Pawns/Pawn";
import { IInventionRenderData } from "../../../../../interfaces/Inventions/Invention";

type Props = {
  invention: IInventionRenderData;
  column: number;
  row: number;
  top: number;
  actionSlots: Map<string, IPawnRenderData | null>;
  zIndex: string;
  setIsEnlarged?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Invention(props: Props) {
  const [enlarge, setEnlarge] = useState(false);

  const inventionRef = React.createRef<HTMLDivElement>();

  function handleClick() {
    setEnlarge((prev) => !prev);
    if (props.setIsEnlarged) {
      props.setIsEnlarged((prev) => !prev);
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

  Object.entries(props.invention.committedResources).forEach(
    ([key, value], i) => {
      for (let i = 0; i < value; i++) {
        resources.push(
          <div className={styles.resource} key={i}>
            <Image
              src={`/interface/resources/${key}.png`}
              layout="fill"
              alt="surowiec"
            />
          </div>
        );
      }
    }
  );

  const leaderId = "invention-" + props.invention.name + "-leader";
  let leaderPawn = props.actionSlots.get(leaderId);
  leaderPawn = leaderPawn ? leaderPawn : null;

  const zIndexClass = props.zIndex.includes(props.invention.name)
    ? styles.zIndexIncreased
    : "";

  console.log("ZINDEX " + props.zIndex);

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
