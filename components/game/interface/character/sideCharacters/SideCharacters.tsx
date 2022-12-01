import Image from "next/image";
import React from "react";
import Pawn from "../../Pawn";
import FridayHealth from "./fridayHealth/FridayHealth";
import styles from "./SideCharacters.module.css";
import { Droppable } from "react-beautiful-dnd";
import { ISideCharacterRenderData } from "../../../../../interfaces/Characters/SideCharacter";

interface Props {
  friday: ISideCharacterRenderData;
  dog: ISideCharacterRenderData;
}

export default function SideCharacters(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.friday}>
        <Droppable droppableId={"freepawns-friday"}>
          {(provided) => (
            <div
              className={styles.pawn}
              id={"friday-droppable"}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.friday.pawnService.freePawns[0] &&
                props.friday.pawnService.freePawns.map((pawn, i) => {
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
        <Droppable droppableId={"freepawns-dog"}>
          {(provided) => (
            <div
              className={styles.pawn}
              ref={provided.innerRef}
              {...provided.droppableProps}
              id={"dog-droppable"}
            >
              {props.dog.pawnService.freePawns[0] &&
                props.dog.pawnService.freePawns.map((pawn, i) => {
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
