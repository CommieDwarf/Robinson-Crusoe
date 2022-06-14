import Image from "next/image";
import React from "react";
import PlayerSlot from "../PlayerSlot";
import Scrollbar from "../Scrollbar";
import styles from "./Tile.module.css";

interface Props {
  position: {
    left: number;
    top: number;
  };
  typeId: number;
}

export default function Tile(props: Props) {
  let style = {
    top: props.position.top + "%",
    left: props.position.left + "%",
  };

  let playerSlots;

  if (props.typeId == 11) {
    playerSlots = (
      <div className={styles.explorePlayerSlots}>
        <PlayerSlot type={"helper"} character={null} action={"explore"} />
        <PlayerSlot type={"leader"} character={null} action={"explore"} />
      </div>
    );
  } else {
    playerSlots = (
      <Scrollbar styleModule={styles} >
        <div className={styles.gatherPlayerSlots}>
          <PlayerSlot type={"leader"} character={null} action={"gather"} />
          <PlayerSlot type={"leader"} character={null} action={"gather"} />
          <PlayerSlot type={"helper"} character={null} action={"gather"} />
          <PlayerSlot type={"helper"} character={null} action={"gather"} />
          {/* <PlayerSlot type={"helper"} character={null} action={"gather"} />
          <PlayerSlot type={"helper"} character={null} action={"gather"} /> */}
        </div>
      </Scrollbar>
    );
  }

  return (
    <div className={styles.container} style={style}>
      <div className={styles.tile}>
        <Image
          src={`/interface/map/tiles/${props.typeId}.png`}
          layout="fill"
          alt="kafelek"
        />
      </div>
      {playerSlots}
    </div>
  );
}
