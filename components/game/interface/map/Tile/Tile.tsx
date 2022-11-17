import Image from "next/image";
import React from "react";
import ActionSlot from "../../ActionSlot";
import Scrollbar from "../../Scrollbar";
import styles from "./Tile.module.css";
import { ITileRenderData } from "../../../../../interfaces/Tiles/Tile";
import { IPawnRenderData } from "../../../../../interfaces/Pawns/Pawn";

interface Props {
  tile: ITileRenderData;
  contentScale: number;
  actionSlots: Map<string, IPawnRenderData | null>;
  isDragDisabled: boolean;
  zIndex: string;
  camp: boolean;
}

export default function Tile(props: Props) {
  let style = {
    top: props.tile.position.cords.top + "%",
    left: props.tile.position.cords.left + "%",
  };

  function getActionSlots(
    action: "explore" | "gather",
    side: "left" | "right" | ""
  ): JSX.Element[] {
    const actionSlots = [];
    const sideString = side ? side + "-" : "";
    for (let i = 0; i < props.tile.helpersRequired + 1; i++) {
      const id = `tile-${props.tile.id}-${action}-${sideString}helper-${i + 1}`;
      let pawn = props.actionSlots.get(id);
      pawn = pawn === undefined ? null : pawn;
      actionSlots.push(
        <ActionSlot
          type={"helper"}
          pawn={pawn}
          action={action}
          context={action}
          id={id}
          key={id}
          isDragDisabled={props.isDragDisabled}
        />
      );
    }

    const id = `tile-${props.tile.id}-${action}-${sideString}leader-0`;
    let pawn = props.actionSlots.get(id);
    pawn = pawn === undefined ? null : pawn;

    actionSlots.unshift(
      <ActionSlot
        type={"leader"}
        pawn={pawn}
        action={action}
        context={action}
        id={id}
        key={id}
        isDragDisabled={props.isDragDisabled}
      />
    );

    return actionSlots;
  }

  let actionSlots;

  if (!props.tile.tileType) {
    actionSlots = (
      <div className={styles.explorePlayerSlots}>
        {getActionSlots("explore", "")}
      </div>
    );
  } else {
    let scrollableClass =
      props.tile.helpersRequired >= 1 ? styles.gatherActionSlotsScrollable : "";

    actionSlots = (
      <Scrollbar styleModule={styles}>
        <div className={styles.gatherActionSlots + " " + scrollableClass}>
          <div className={styles.gatherActionSlotsLeft}>
            {getActionSlots("gather", "left")}
          </div>
          <div className={styles.gatherActionSlotsRight}>
            {getActionSlots("gather", "right")}
          </div>
        </div>
      </Scrollbar>
    );
  }

  const imgId = props.tile.tileType == null ? 11 : props.tile.tileType.id;

  const zIndexClass =
    props.zIndex.includes("tile") &&
    props.zIndex.includes("-" + props.tile.id + "-")
      ? styles.zIndexIncreased
      : "";
  return (
    <div className={styles.container + " " + zIndexClass} style={style}>
      {props.tile.show && (
        <>
          <div className={styles.tile}>
            <Image
              src={`/interface/map/tiles/${imgId}.png`}
              layout="fill"
              alt="kafelek"
            />
          </div>
          {actionSlots}
          {props.camp && (
            <div className={styles.campIcon}>
              <Image
                src={"/interface/map/camp.png"}
                layout={"fill"}
                alt={"obóz"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
