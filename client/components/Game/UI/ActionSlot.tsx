import React from "react";
import styles from "./ActionSlot.module.css";
import {Droppable} from "react-beautiful-dnd";

import Pawn from "./Pawn";
import {kebabCase} from "lodash";
import {IPawn, IPawnRenderData} from "@shared/types/Game/Pawns/Pawn";
import {ACTION, UniqueAction} from "@shared/types/Game/ACTION";
import {useAppSelector} from "../../../store/hooks";
import {selectActionSlotById, selectGame} from "../../../reduxSlices/gameSession";
import {RootState} from "../../../store/store";
import {connect} from "react-redux";
import {getPropsComparator} from "../../../utils/getPropsComparator";


interface Props {
    type: "helper" | "leader";
    action: ACTION;
    uniqueAction: UniqueAction;
    id: string;
    isDragDisabled?: boolean;
    ownedByCard?: boolean;
    height?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

interface StateProps {
    pawn: IPawnRenderData<any> | null;
    isSlotMarked: boolean;
}


function ActionSlot(props: Props & StateProps) {
    let pawnElement: JSX.Element;
    const pawn = props.pawn

    if (pawn) {
        pawnElement = <Pawn pawn={pawn} context={props.action} index={1}/>;
    }
    let helperClass = "";

    if (props.ownedByCard) {
        helperClass = styles.helperCard;
    } else if (props.type === "helper") {
        helperClass = styles.helper;
    }


    return (
        <div
            className={`${styles.container} ${
                styles[kebabCase(props.uniqueAction)]
            } ${helperClass}`}
            id={props.id}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >

            <Droppable droppableId={props.id} isDropDisabled={props.isDragDisabled}>
                {(provided) => {
                    return (
                        <div
                            className={styles.actionSlot}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >      {props.isSlotMarked && <div className={styles.marked}></div>}

                            {pawnElement}
                            <div style={{display: "none"}}>{provided.placeholder}</div>
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
}


function mapStateToProps(state: RootState, props: Props): Props & StateProps {
    const pawn: IPawnRenderData<any> | null = selectActionSlotById(state, props.id)

    const isSlotMarked = selectGame(state).actionSlotService.markedActionSlotId === props.id;
    return {
        ...props,
        pawn,
        isSlotMarked,
    };
}

export default connect(mapStateToProps)(React.memo(
    ActionSlot,
    getPropsComparator(["onMouseEnter", "onMouseLeave"])
));
