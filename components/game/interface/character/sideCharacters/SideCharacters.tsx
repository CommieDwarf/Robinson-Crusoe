import Image from "next/image";
import React, { useId } from "react";
import Character from "../../../../../interfaces/Character";
import Pawn from "../../Pawn";
import FridayHealth from "./fridayHealth/FridayHealth";
import styles from "./SideCharacters.module.css";
import characters from "../../../../../server/characters";
import { Droppable } from "react-beautiful-dnd";


interface Props {
  friday: Character;
  dog: Character;
}

export default function SideCharacters(props: Props) {

  
  return (
    <div className={styles.container}>
      <div className={styles.friday}>
      <Droppable droppableId={"friday-droppable"}>
            {(provided) => (
              <div className={styles.pawn}
              id={"friday-droppable"}
              ref={provided.innerRef}
              {...provided.droppableProps}
              >
                 {props.friday.freePawns[0] && <Pawn pawn={props.friday.freePawns[0]} context="character" index={0}/>}
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
      <div className={styles.dogPawn}>
        
      </div>
      <Droppable droppableId={"dog-droppable"}>
            {(provided) => (
              <div className={styles.pawn}
              ref={provided.innerRef}
              {...provided.droppableProps}
              id={"dog-droppable"}
              >
                 {props.dog.freePawns[0] && <Pawn pawn={props.dog.freePawns[0]} context="character" index={0} />}
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
