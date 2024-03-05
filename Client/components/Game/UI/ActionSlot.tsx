import React from "react";
import styles from "./ActionSlot.module.css";
import {Droppable} from "react-beautiful-dnd";

import Pawn from "./Pawn";
import {IPawnRenderData} from "../../../../interfaces/Pawns/Pawn";
import {ACTION, UniqueAction} from "../../../../interfaces/ACTION";
import {formatToKebabCase} from "../../../../utils/formatToKebabCase";
import {RootState} from "../../../store/store";
import {connect} from "react-redux";


interface StateProps {
    pawn: IPawnRenderData<any> | undefined | null;
    marked: boolean;
}

interface Props extends StateProps {
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


function ActionSlot(props: Props) {
    let element: JSX.Element;

    const pawn = props.pawn;
    if (pawn) {
        element = <Pawn pawn={pawn} context={props.action} index={1}/>;
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
                styles[formatToKebabCase(props.uniqueAction)]
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
                        >      {props.marked && <div className={styles.marked}></div>}

                            {element}
                            <div style={{display: "none"}}>{provided.placeholder}</div>
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
}

function mapStateToProps(state: RootState, ownProps: Omit<Props, keyof StateProps>): Props {
    const pawn = state.actionSlots.slots[ownProps.id];
    let marked =
        (state.actionSlots.markedActionSlot &&
            ownProps.id.includes(state.actionSlots.markedActionSlot)) ||
        false;
    return {
        pawn,
        ...ownProps,
        marked,
    };
}

export default connect(mapStateToProps)(ActionSlot);
