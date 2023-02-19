import Image from "next/image";
import React from "react";
import Pawn from "../../Pawn";
import FridayHealth from "./fridayHealth/FridayHealth";
import styles from "./SideCharacters.module.css";
import { Droppable } from "react-beautiful-dnd";
import { ISideCharacterRenderData } from "../../../../../interfaces/Characters/SideCharacter";
import fridayPicImg from "/public/UI/characters/side-characters/friday-pic.png";
import dogPicImg from "/public/UI/characters/side-characters/dog-pic.png";
import dogUsageImg from "/public/UI/characters/dog-usage.png";
import { useAppSelector } from "../../../../../store/hooks";
import { objectsEqual } from "../../../../../utils/objectsEqual";

interface Props {
  friday: ISideCharacterRenderData;
  dog: ISideCharacterRenderData;
}

// interface Props extends OwnProps {
//   fridayPawns: IPawnRenderData[];
//   dogPawns: IPawnRenderData[];
// }

function SideCharacters(props: Props) {
  const dogPawns = useAppSelector((state) => state.freePawns.dog, objectsEqual);
  const fridayPawns = useAppSelector(
    (state) => state.freePawns.friday,
    objectsEqual
  );

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
              {fridayPawns[0] &&
                fridayPawns.map((pawn, i) => {
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
        <div className={`${styles.name}`}>Piętaszek</div>
        <FridayHealth health={0} />
        <div className={styles.picture}>
          <Image
            src={fridayPicImg}
            fill
            alt="piętaszek"
            sizes={styles.picture}
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
              {dogPawns[0] &&
                dogPawns.map((pawn, i) => {
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
        <div className={styles.dogUsage}>
          <Image
            src={dogUsageImg}
            fill
            alt="umiejetności psa"
            sizes={styles.dogUsage}
          />
        </div>
        <div className={`${styles.picture} ${styles.dogPic}`}>
          <Image src={dogPicImg} fill alt="pies" sizes={styles.picture} />
        </div>
      </div>
    </div>
  );
}

// function mapStateToProps(state: RootState, ownProps: OwnProps) {
//   const dogPawns = state.freePawns.dog;
//   const fridayPawns = state.freePawns.friday;
//   return { dogPawns, fridayPawns, ...ownProps };
// }

export default React.memo(SideCharacters, objectsEqual);
