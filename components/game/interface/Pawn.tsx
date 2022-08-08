import Image from "next/image";
import React, { useId } from "react";
import styles from "./Pawn.module.css";
import { Draggable } from "react-beautiful-dnd";
import { IPawn } from "../../../interfaces/Pawns/Pawn";

type Helper = "explore" | "gather" | "build" | "hunt";

const helpers = ["explore", "gather", "build", "hunt"];

type SideCharacter = "friday" | "dog";

interface Props {
  pawn: IPawn;
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
  console.log(props.pawn.character.gender);
  if (props.pawn.character.gender) {
    pawn = (
      <div className={styles.pawn} id={props.pawn.draggableId}>
        <Image
          src={`/interface/characters/pawns/${props.pawn.character.name}-${props.pawn.character.gender}.png`}
          layout="fill"
          alt="pionek"
        />
      </div>
    );
  } else if (
    props.pawn &&
    (props.pawn.character.name == "friday" ||
      props.pawn.character.name === "dog")
  ) {
    pawn = (
      <div
        className={styles.pawn + " " + styles[props.pawn.character.name]}
        id={props.pawn.draggableId}
      >
        <Image
          src={`/interface/characters/pawns/${props.pawn.character.name}.png`}
          layout="fill"
          alt="pionek"
        />
      </div>
    );
  } else {
    pawn = (
      <div
        className={styles.pawn + " " + styles[props.pawn.character.name]}
        id={props.pawn.draggableId}
      >
        <Image
          src={`/interface/characters/pawns/helper.png`}
          layout="fill"
          alt="pionek"
        />
      </div>
    );
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
            {pawn}
          </div>
        );
      }}
    </Draggable>
  );
}
