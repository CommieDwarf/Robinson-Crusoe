import Image from "next/image";
import React from "react";
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

  return (
    <div className={styles.container} style={style}>
      <div className={styles.tile}>
        <Image
          src={`/interface/map/tiles/${props.typeId}.png`}
          layout="fill"
          alt="kafelek"
        />
      </div>
    </div>
  );
}
