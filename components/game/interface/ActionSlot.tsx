import Image from 'next/image';
import React from 'react'
import styles from "./ActionSlot.module.css";

interface Props {
    type: "helper" | "leader",
    character: null | {}, 
    action: "threat" | "hunt" | "build" | "gather" | "explore" | "arrange-camp" | "rest",
    size: {
      width: string,
      height: string
    },
}

export default function PlayerSlot(props: Props) {
  
  let slotIcon; 
  if (props.character) {
    slotIcon = "character"
  } else if (props.type == "leader") {
    slotIcon = props.action;
  } else {
    slotIcon = "helper"
  }

  

  return (
    <div className={styles.actionSlot} style={props.size}>
      <Image src={"/interface/playerSlot/" + slotIcon + ".png"} layout="fill" alt={slotIcon} /> 
    </div>
  )
}
