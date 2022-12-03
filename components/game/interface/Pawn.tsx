import Image from "next/image";
import React, { useId } from "react";
import styles from "./Pawn.module.css";
import { Draggable } from "react-beautiful-dnd";
import {
  IPawnHelperRenderData,
  IPawnRenderData,
} from "../../../interfaces/Pawns/Pawn";

interface Props {
  pawn: IPawnRenderData | IPawnHelperRenderData;
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
  let imageName: string;
  let pawnClass: keyof typeof styles;
  if ("action" in props.pawn) {
    imageName = "helper";
    pawnClass = props.pawn.action;
  } else {
    pawnClass = props.pawn.character.name;
    imageName = props.pawn.character.name + "-" + props.pawn.character.gender;
  }

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
              className={styles.pawn + " " + styles[pawnClass]}
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
