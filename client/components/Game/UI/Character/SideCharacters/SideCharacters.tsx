import React from "react";
import Pawn from "../../Pawn";
import FridayHealth from "./FridayHealth/FridayHealth";
import styles from "./SideCharacters.module.css";
import {Droppable} from "react-beautiful-dnd";
import fridayPicImg from "/public/UI/characters/side-characters/friday-pic.png";
import dogPicImg from "/public/UI/characters/side-characters/dog-pic.png";
import dogUsageImg from "/public/UI/characters/dog-usage.png";
import {useAppSelector} from "../../../../../store/hooks";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import determinationTokenImg from "/public/UI/tokens/determination.png";
import {objectsEqual} from "@shared/utils/objectsEqual";
import {getOwnedDroppableId} from "@shared/utils/getOwnedDroppableId";
import {ISideCharacterRenderData} from "@shared/types/Game/Characters/SideCharacter";

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
                <Droppable droppableId={getOwnedDroppableId("friday", "character")}>
                    {(provided) => (
                        <div
                            className={`${styles.pawn} ${styles.fridayPawn}`}
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
                <FridayHealth health={props.friday.health}/>
                <div className={styles.determination}>
                    <div className={styles.determinationValue}>{props.friday.determination}</div>
                    <div className={styles.determinationIcon}>
                        <ResizableImage src={determinationTokenImg} alt={"determinacja"}/>
                    </div>
                </div>
                <div className={styles.fridayPic}>
                    <ResizableImage
                        src={fridayPicImg}
                        fill
                        alt="Piętaszek"
                        sizes={styles.picture}
                    />
                </div>
            </div>
            <div className={styles.dog}>
                <div className={styles.dogPawn}></div>
                <Droppable droppableId={getOwnedDroppableId("dog", "character")}>
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
                    <ResizableImage
                        src={dogUsageImg}
                        fill
                        alt="umiejętności psa"
                        sizes={styles.dogUsage}
                    />
                </div>
                <div className={`${styles.dogPic}`}>
                    <ResizableImage src={dogPicImg} fill alt="pies" sizes={styles.picture}/>
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
