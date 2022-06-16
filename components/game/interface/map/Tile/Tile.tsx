import Image from "next/image";
import React from "react";
import ITile from "../../../../../interfaces/Tile";
import ActionSlot from "../../ActionSlot";
import Scrollbar from "../../Scrollbar";
import styles from "./Tile.module.css";

interface Props {
  tile: ITile;
}

export default function Tile(props: Props) {
  let style = {
    top: props.tile.structure.position.top + "%",
    left: props.tile.structure.position.left + "%",
  };

  let actionSlots;

const actionSlotSize = {
  width: "50%",
  height: "50%"
}

  if (!props.tile.type) {
    actionSlots = (
      <div className={styles.explorePlayerSlots}>
        <ActionSlot type={"helper"} character={null} action={"explore"} size={actionSlotSize}/>
        <ActionSlot type={"leader"} character={null} action={"explore"} size={actionSlotSize} />
      </div>
    );
  } else {
    actionSlots = (
      <Scrollbar styleModule={styles} >
        <div className={styles.gatherPlayerSlots}>
          <ActionSlot type={"leader"} character={null} action={"gather"} size={actionSlotSize}  />
          <ActionSlot type={"leader"} character={null} action={"gather"} size={actionSlotSize} />
          <ActionSlot type={"helper"} character={null} action={"gather"} size={actionSlotSize} />
          <ActionSlot type={"helper"} character={null} action={"gather"} size={actionSlotSize} />
          {/* <PlayerSlot type={"helper"} character={null} action={"gather"} />
          <PlayerSlot type={"helper"} character={null} action={"gather"} /> */}
        </div>
      </Scrollbar>
    );
  }

  const imgId = props.tile.type == null ? 11 : props.tile.type.id;

  return (
    <div className={styles.container} style={style}>
      {props.tile.show && <><div className={styles.tile}>
        <Image
          src={`/interface/map/tiles/${imgId}.png`}
          layout="fill"
          alt="kafelek"
        />
      </div>
      {actionSlots} </>}
    </div>
  );
}
