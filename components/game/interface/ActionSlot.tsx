import Image from "next/image";
import React, { useId } from "react";
import styles from "./ActionSlot.module.css";
import { Droppable } from "react-beautiful-dnd";
import characters, {
  Character,
} from "../../../server/Classes/Characters/characters";
import Pawn from "./Pawn";
import IPawn from "../../../interfaces/Pawns/Pawn";

interface Props {
  type: "helper" | "leader";
  pawn: null | IPawn | undefined;
  action:
    | "threat"
    | "hunt"
    | "build"
    | "gather"
    | "explore"
    | "arrange"
    | "rest";
  context:
    | "gather"
    | "explore"
    | "structure"
    | "invention"
    | "rest"
    | "arrange"
    | "threat"
    | "hunt";
  id: string;
  isDragDisabled?: boolean;
}

export default function PlayerSlot(props: Props) {
  let slotIcon: string;
  if (props.pawn) {
    slotIcon = "character";
  } else if (props.type == "leader") {
    slotIcon = props.action;
  } else {
    slotIcon = "helper";
  }

  let element: JSX.Element;

  if (props.pawn) {
    element = <Pawn pawn={props.pawn} context={props.context} index={1} />;
  }

  const helperClass = props.type == "helper" ? styles.helper : "";

  return (
    <div
      className={
        styles.container + " " + styles[props.context] + " " + helperClass
      }
      id={props.id}
    >
      <Droppable droppableId={props.id} isDropDisabled={props.isDragDisabled}>
        {(provided) => {
          return (
            <div
              className={styles.actionSlot}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {element}
              <div style={{ display: "none" }}>{provided.placeholder}</div>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
