import Image from "next/image";
import React, { useId } from "react";
import styles from "./Pawn.module.css";
import { Draggable } from "react-beautiful-dnd";
import { IPawnRenderData } from "../../../interfaces/Pawns/Pawn";

interface Props {
  pawn: IPawnRenderData;
  context:
    | "gather"
    | "explore"
    | "structure"
    | "invention"
    | "arrangeCamp"
    | "rest"
    | "threat"
    | "hunt"
    | "character";
  index: number;
}

export default function Pawn(props: Props) {
  let imageName = props.pawn.character.gender
    ? props.pawn.character.name + "-" + props.pawn.character.gender
    : props.pawn.character.name;

  const context =
    props.pawn.character.name === "dog" ||
    props.pawn.character.name === "friday"
      ? props.context + "ContextSideCharacter"
      : props.context + "Context";

  return (
    <Draggable draggableId={props.pawn.draggableId} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div
            className={styles.container + " " + styles[context]}
            id={props.pawn.draggableId}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div
              className={styles.pawn + " " + styles[props.pawn.character.name]}
              id={props.pawn.draggableId}
            >
              <Image
                src={`/interface/characters/pawns/${imageName}.png`}
                layout="fill"
                alt="pionek"
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
