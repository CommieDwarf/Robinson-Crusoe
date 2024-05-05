import React from "react";
import styles from "./Pawn.module.css";
import {Draggable} from "react-beautiful-dnd";
import {useAppSelector} from "../../../store/hooks";
import ResizableImage from "../../ResizableImage/ResizableImage";
import {kebabCase} from "lodash";
import {ACTION} from "@shared/types/Game/ACTION";
import {IPawnRenderData} from "@shared/types/Game/Pawns/Pawn";
import {selectGame} from "../../../reduxSlices/gameSession";

interface Props {
    pawn: IPawnRenderData<any>;
    context: ACTION | "character";
    index: number;
}

export default function Pawn(props: Props) {
    let imageName: string;
    let pawnClass: keyof typeof styles;
    if (props.pawn.action) {
        imageName = "helper";
        pawnClass = kebabCase(props.pawn.action);
    } else {
        pawnClass = props.pawn.owner.name;
        imageName = `${props.pawn.owner.name}-${props.pawn.owner.gender}`;
    }

    const context =
        props.pawn.owner.name === "dog" ||
        props.pawn.owner.name === "friday"
            ? props.context + "ContextSideCharacter"
            : props.context + "Context";


    const disabled = useAppSelector((state) => {
        return selectGame(state).phaseService.phase !== "preAction";
    })
    return (
        <Draggable draggableId={props.pawn.draggableId} index={props.index} isDragDisabled={disabled}>
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
                            <ResizableImage
                                src={`/UI/characters/pawns/${imageName}.png`}
                                fill
                                alt="pionek"
                                sizes={styles.pawn}
                            />
                        </div>
                    </div>
                );
            }}
        </Draggable>
    );
}
