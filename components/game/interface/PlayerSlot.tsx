import Image from 'next/image';
import React from 'react'
import styles from "./PlayerSlot.module.css";

interface Props {
    type: "helper" | "leader",
    character: null | {}, 
    action: "threat" | "hunt" | "build" | "gather" | "explore" | "arrange-camp" | "rest";
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
    <div className={styles.playerSlot + " " + styles[props.action + "Slot"]}>
      <Image src={"/interface/playerSlot/" + slotIcon + ".png"} layout="fill" alt={slotIcon} /> 
    </div>
  )
}
