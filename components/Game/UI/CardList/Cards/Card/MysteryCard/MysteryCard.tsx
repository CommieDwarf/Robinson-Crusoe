// @flow
import * as React from "react";
import styles from "../Invention/Invention.module.css";
import Image from "next/image";
import { IMysteryCardRenderData } from "../../../../../../../interfaces/MysteryService/MysteryCard";
import { useState } from "react";

type Props = {
  mysteryCard: IMysteryCardRenderData;
  column: number;
  row: number;
  top: number;
  zIndexIncreased: boolean;
  toggleZoom: () => void;
  hideActionSlots?: boolean;
};
export const MysteryCard = (props: Props) => {
  const [enlarge, setEnlarge] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleLoad() {
    setImageLoaded(true);
  }

  function handleClick() {
    setEnlarge((prev) => !prev);
    props.toggleZoom();
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

  const zIndexClass = props.zIndexIncreased ? styles.zIndexIncreased : "";

  return (
    <div
      className={`${styles.invention} ${enlargedClass} ${zIndexClass}`}
      onClick={handleClick}
      style={wrapperStyle}
    >
      <Image
        src={`/UI/cards/${props.mysteryCard.type}/${props.mysteryCard.name}.png`}
        fill
        alt={"karta pomysłu"}
        onLoad={handleLoad}
        sizes={styles.invention}
        placeholder="blur"
      />
    </div>
  );
};
