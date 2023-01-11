import Image from "next/image";
import React, { useState } from "react";
import styles from "./Threat.module.css";
import { IEventCardRenderData } from "../../../../interfaces/EventService/EventCard";
import { getImgName } from "../../../../utils/getImgName";

interface Props {
  card: IEventCardRenderData | null;
}

export default function Card(props: Props) {
  const [enlarged, setEnlarged] = useState(false);

  function handleClick() {
    if (!props.card) {
      return;
    }
    setEnlarged((prev) => !prev);
  }

  const enlargedClass = enlarged && props.card ? styles.cardEnlarged : "";

  const zIndexClass = enlarged
    ? styles.zIndexIncreased
    : styles.zIndexTransition;

  return (
    <div
      className={`${styles.cardSlot} ${enlargedClass} ${zIndexClass}`}
      onClick={handleClick}
    >
      {props.card && (
        <Image
          src={`/UI/cards/event/${getImgName(props.card.name)}.png`}
          fill
          alt={props.card.name}
          sizes={styles.cardSlot}
        />
      )}
    </div>
  );
}
