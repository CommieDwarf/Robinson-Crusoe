import Image from "next/image";
import React, { NewLifecycle } from "react";
import { Character } from "../../../../../server/characters";
import ITile from "../../../../../interfaces/Tile";
import ActionSlot from "../../ActionSlot";
import Scrollbar from "../../Scrollbar";
import styles from "./Tile.module.css";
import IPawn from "../../../../../interfaces/Pawn";
import Pawn from "../../../../../interfaces/Pawn";

interface Props {
  tile: ITile;
  contentScale: number;
  actionSlots: Map<string, Pawn | null>;
}

export default function Tile(props: Props) {
  let style = {
    top: props.tile.structure.position.top + "%",
    left: props.tile.structure.position.left + "%",
  };

  function getActionSlots(
    action: "explore" | "gather",
    side: "left" | "right" | ""
  ): JSX.Element[] {
    const actionSlots = [];
    for (let i = 0; i < props.tile.helpersRequied; i++) {
      const id = "tile" + props.tile.id + action + side + "helper" + (i + 1);
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
        />
      );
    }

    const id = "tile" + props.tile.id + action + side + "leader";
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
      />
    );

    return actionSlots;
  }

  let actionSlots;

  if (!props.tile.type) {
    actionSlots = (
      <div className={styles.explorePlayerSlots}>
        {getActionSlots("explore", "")}
      </div>
    );
  } else {
    let scrollableClass = props.tile.helpersRequied > 1 ? styles.gatherActionSlotsScrollable : "";

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

  const imgId = props.tile.type == null ? 11 : props.tile.type.id;

  return (
    <div className={styles.container} style={style}>
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
        </>
      )}
    </div>
  );
}
