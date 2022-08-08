import Image from "next/image";
import React, { useState } from "react";
import styles from "./Threat.module.css";
import { IEventCard } from "../../../../interfaces/Threat/EventCard";

interface Props {
  card: IEventCard | null;
}

export default function Card(props: Props) {
  const [enlarged, setEnlarged] = useState(false);

  function handleClick() {
    setEnlarged((prev) => !prev);
  }

  const enlargedClass = enlarged && props.card ? styles.cardEnlarged : "";

  const zIndexClass = enlarged
    ? styles.zIndexIncreased
    : styles.zIndexTransition;

  return (
    <div
      className={styles.cardSlot + " " + enlargedClass + " " + zIndexClass}
      onClick={handleClick}
    >
      {props.card && (
        <Image
          src={`/interface/cards/wreckage/${props.card.name}.png`}
          layout="fill"
          alt={props.card.name}
        />
      )}
    </div>
  );
}
