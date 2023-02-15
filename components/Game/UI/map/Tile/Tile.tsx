import Image from "next/image";
import React from "react";
import ActionSlot from "../../ActionSlot";
import Scrollbar from "../../Scrollbar";
import styles from "./Tile.module.css";
import { ITileRenderData } from "../../../../../interfaces/TileService/ITile";
import { IPawnRenderData } from "../../../../../interfaces/Pawns/Pawn";
import { MoveCampArrow } from "./MoveCampArrow/MoveCampArrow";
import { ACTION } from "../../../../../interfaces/ACTION";
import {
  ACTION_ITEM,
  getDroppableID,
} from "../../../../../utils/getDroppableID";

import xMarkImg from "/public/UI/misc/x-mark.png";
import { ResourceDepletionButton } from "./ResourceDepletionButton/ResourceDepletionButton";

interface Props {
  tile: ITileRenderData;
  contentScale: number;
  isDragDisabled: boolean;
  zIndex: string;
  campSettableTiles: ITileRenderData[];
  showCampMoveConfirm: (tile: ITileRenderData) => void;
  depleteResource: (tileID: number, side: "left" | "right") => void;
}

export default function Tile(props: Props) {
  let style = {
    top: props.tile.position.cords.top + "%",
    left: props.tile.position.cords.left + "%",
  };

  function getActionSlots(
    action: ACTION.GATHER | ACTION.EXPLORE,
    side: "left" | "right" | ""
  ): JSX.Element[] {
    const actionSlots = [];
    const context =
      action === ACTION.GATHER ? ACTION_ITEM.GATHER : ACTION_ITEM.EXPLORE;
    for (let i = 0; i < props.tile.requiredHelperAmount + 1; i++) {
      const id = getDroppableID(context, props.tile.id, side, i + 1);

      actionSlots.push(
        <ActionSlot
          type={"helper"}
          action={action}
          context={context}
          id={id}
          key={id}
          isDragDisabled={props.isDragDisabled}
        />
      );
    }

    const id = getDroppableID(context, props.tile.id, side, 0);

    actionSlots.unshift(
      <ActionSlot
        type={"leader"}
        action={action}
        context={context}
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
        {getActionSlots(ACTION.EXPLORE, "")}
      </div>
    );
  } else {
    let scrollableClass =
      props.tile.requiredHelperAmount >= 1
        ? styles.gatherActionSlotsScrollable
        : "";

    actionSlots = (
      <Scrollbar styleModule={styles}>
        <div className={styles.gatherActionSlots + " " + scrollableClass}>
          {props.tile.tileType.resources.left.resource !== "beast" &&
            !props.tile.tileType.resources.left.depleted && (
              <div className={styles.gatherActionSlotsLeft}>
                {getActionSlots(ACTION.GATHER, "left")}
              </div>
            )}
          {props.tile.tileType.resources.right.resource !== "beast" &&
            !props.tile.tileType.resources.right.depleted && (
              <div className={styles.gatherActionSlotsRight}>
                {getActionSlots(ACTION.GATHER, "right")}
              </div>
            )}
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

  const arrows = props.campSettableTiles.map((tile, i) => {
    return (
      <MoveCampArrow
        tile={tile}
        campTile={props.tile}
        key={i}
        showCampMoveConfirm={props.showCampMoveConfirm}
      />
    );
  });

  return (
    <div className={`${styles.container} ${zIndexClass}`} style={style}>
      {arrows}
      {props.tile.show && (
        <>
          <div className={styles.tile}>
            <Image
              src={`/UI/map/tiles/${imgId}.png`}
              fill
              alt="kafelek"
              sizes={styles.tile}
            />
          </div>
          {!props.tile.camp && actionSlots}
          {props.tile.camp && (
            <div className={styles.campIcon}>
              <Image
                src={"/UI/tokens/camp.png"}
                fill
                alt={"obóz"}
                sizes={styles.campIcon}
              />
            </div>
          )}
          {props.tile.tileType?.resources.left.depleted && (
            <div
              className={`${styles.depletedMark} ${styles.depletedMarkLeft}`}
            >
              <Image
                src={xMarkImg}
                alt={"źródło wyczerpane"}
                fill
                sizes={styles.xMark}
              />
            </div>
          )}
          {props.tile.tileType?.resources.right.depleted && (
            <div
              className={`${styles.depletedMark} ${styles.depletedMarkRight}`}
            >
              <Image
                src={xMarkImg}
                alt={"źródło wyczerpane"}
                fill
                sizes={styles.xMark}
              />
            </div>
          )}
          {props.tile.tileType?.resources.right.markedForDepletion && (
            <ResourceDepletionButton
              side={"right"}
              tileID={props.tile.id}
              depleteResource={props.depleteResource}
            />
          )}
          {props.tile.tileType?.resources.left.markedForDepletion && (
            <ResourceDepletionButton
              side={"left"}
              tileID={props.tile.id}
              depleteResource={props.depleteResource}
            />
          )}
        </>
      )}
    </div>
  );
}
