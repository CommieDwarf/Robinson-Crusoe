import Image from "next/image";
import React, { useId } from "react";
import styles from "./Pawn.module.css";
import { Draggable } from "react-beautiful-dnd";
import IPawn from "../../../interfaces/Pawn";

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
    | "arrange"
    | "rest"
    | "threat"
    | "hunt"
    | "character";
  index: number;
}

export default function Pawn(props: Props) {
  let pawn: JSX.Element;
  if (props.pawn && props.pawn.character.name && props.pawn.character.gender) {
    pawn = (
      <div className={styles.pawn} id={props.pawn.id}>
        <Image
          src={`/interface/characters/pawns/${props.pawn.character.name.en}-${props.pawn.character.gender}.png`}
          layout="fill"
          alt="pionek"
        />
      </div>
    );
  } else if (
    props.pawn &&
    (props.pawn.character.name.en == "friday" ||
      props.pawn.character.name.en === "dog")
  ) {
    pawn = (
      <div
        className={styles.pawn + " " + styles[props.pawn.character.name.en]}
        id={props.pawn.id}
      >
        <Image
          src={`/interface/characters/pawns/${props.pawn.character.name.en}.png`}
          layout="fill"
          alt="pionek"
        />
      </div>
    );
  } else {
    pawn = (
      <div
        className={styles.pawn + " " + styles[props.pawn.character.name.en]}
        id={props.pawn.id}
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
    props.pawn.character.name.en === "dog" ||
    props.pawn.character.name.en === "friday"
      ? props.context + "ContextSideCharacter"
      : props.context + "Context";

  return (
    <Draggable draggableId={props.pawn.id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div
            className={styles.container + " " + styles[context]}
            id={props.pawn.id}
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
