// @flow
import * as React from "react";
import styles from "./ResourceDepletionButton.module.css";
import Image from "next/image";
import circleImg from "/public/UI/misc/red-circle-2.png";

interface Props {
  side: "left" | "right";
  tileID: number;
  depleteResource: (tileID: number, side: "left" | "right") => void;
}

export const ResourceDepletionButton = (props: Props) => {
  function handleClick() {
    props.depleteResource(props.tileID, props.side);
  }

  return (
    <div
      className={`${styles.container} ${
        props.side === "right" ? styles.right : styles.left
      }`}
      onClick={handleClick}
    >
      <Image
        src={circleImg}
        alt={"wyczerp źródło"}
        fill
        sizes={styles.container}
      />
    </div>
  );
};
