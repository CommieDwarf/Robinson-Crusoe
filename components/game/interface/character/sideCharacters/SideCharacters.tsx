import Image from "next/image";
import React from "react";
import Pawn from "../../Pawn";
import FridayHealth from "./fridayHealth/FridayHealth";
import styles from "./SideCharacters.module.css";
import { Droppable } from "react-beautiful-dnd";
import { ISideCharacter } from "../../../../../interfaces/Characters/SideCharacter";

interface Props {
  friday: ISideCharacter;
  dog: ISideCharacter;
}

export default function SideCharacters(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.friday}>
        <Droppable droppableId={"friday-droppable"}>
          {(provided) => (
            <div
              className={styles.pawn}
              id={"friday-droppable"}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.friday.pawns.freePawns[0] &&
                props.friday.pawns.freePawns.map((pawn, i) => {
                  return (
                    <Pawn
                      pawn={pawn}
                      context="character"
                      index={i}
                      key={pawn.draggableId}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className={`${styles.name} ${styles["friday-name"]}`}>
          Piętaszek
        </div>
        <FridayHealth health={0} />
        <div className={styles.picture}>
          <Image
            src="/interface/characters/friday-pic.png"
            layout="fill"
            alt="piętaszek"
          />
        </div>
      </div>
      <div className={styles.dog}>
        <div className={styles.dogPawn}></div>
        <Droppable droppableId={"dog-droppable"}>
          {(provided) => (
            <div
              className={styles.pawn}
              ref={provided.innerRef}
              {...provided.droppableProps}
              id={"dog-droppable"}
            >
              {props.dog.pawns.freePawns[0] &&
                props.dog.pawns.freePawns.map((pawn, i) => {
                  return (
                    <Pawn
                      pawn={pawn}
                      context="character"
                      index={i}
                      key={pawn.draggableId}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className={`${styles.name}`}>Pies</div>
        <div className={styles["dog-usage"]}>
          <Image
            src="/interface/characters/dog-usage.png"
            layout="fill"
            alt="umiejetności psa"
          />
        </div>
        <div className={`${styles.picture} ${styles["dog-pic"]}`}>
          <Image
            src="/interface/characters/dog-pic.png"
            layout="fill"
            alt="pies"
          />
        </div>
      </div>
    </div>
  );
}
