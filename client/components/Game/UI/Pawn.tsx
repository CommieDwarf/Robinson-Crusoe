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
    context: ACTION | "character" | "other";
    index: number;
    disabled: boolean;
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


    const player = useAppSelector((state) => selectGame(state)?.players.find((player) => props.pawn.owner.name === player.character?.name));
    const disabled = useAppSelector((state) => {
        return selectGame(state)?.phaseService.phase !== "preAction" || (player && player.id !== state.gameSession.data?.localPlayer.id)
    }) || props.disabled

    const style = {
        backgroundColor: player && !props.pawn.action ? player.color : undefined,
        borderColor: player && props.pawn.action ? player.color : undefined,
        borderWidth: player && props.pawn.action ? 2 : 1,
    }


    const pawn = <div
        className={styles.pawn + " " + styles[pawnClass]}
        id={props.pawn.draggableId}
        style={style}
    >
        <div
            className={`${styles.imgWrapper} ${player && !props.pawn.action && styles.imgWrapperDarkened}`}>
            <ResizableImage
                src={`/UI/characters/pawns/${imageName}.png`}
                fill
                alt="pionek"
                sizes={styles.pawn}
            />
        </div>

    </div>

    return (
        <> {props.disabled ? <div className={styles.container + " " + styles[context]}>{pawn}</div> :
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
                            {pawn}
                        </div>
                    );
                }}
            </Draggable>
        }
        </>

    );
}
