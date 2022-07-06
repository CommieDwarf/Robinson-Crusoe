import Image from "next/image";
import React, { useState } from "react";
import { EventCard } from "../../../../server/threatCards";
import styles from "./Threat.module.css";


interface Props {
    card: EventCard | null;
}

export default function Card(props: Props) {
  const [enlarged, setEnlarged] = useState(false);

  function handleClick() {
    setEnlarged((prev) => !prev);
  }

  const enlargedClass = (enlarged && props.card)? styles.cardEnlarged : "";

  return (
    <div className={styles.cardSlot + " " + enlargedClass} onClick={handleClick}>
      {props.card && <Image
        src={`/interface/cards/wreckage/${props.card.name}.png`}
        layout="fill"
        alt={props.card.name}
      />}
    </div>
  );
}
