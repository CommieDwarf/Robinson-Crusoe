import Image from "next/image";
import React, { useId } from "react";
import styles from "./Pawn.module.css";
import { Draggable } from "react-beautiful-dnd";
import { IPawnRenderData } from "../../../interfaces/Pawns/Pawn";

import { characters } from "../../../server/Classes/Game";

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
  let pawn: JSX.Element;
  const character = characters.find(
    (char) => char.id === props.pawn.characterId
  );
  let imageName = "";
  let charName = "";
  if (character) {
    imageName = character.gender
      ? character.name + "-" + character.gender
      : character.name;
    charName = character.name;
  } else {
  }

  const context =
    character?.name === "dog" || character?.name === "friday"
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
              className={styles.pawn + " " + styles[charName]}
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
