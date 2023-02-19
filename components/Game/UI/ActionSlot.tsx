import React from "react";
import styles from "./ActionSlot.module.css";
import {Droppable} from "react-beautiful-dnd";

import Pawn from "./Pawn";
import {IPawnRenderData} from "../../../interfaces/Pawns/Pawn";
import {ACTION} from "../../../interfaces/ACTION";
import {ACTION_ITEM} from "../../../utils/getDroppableID";
import {getImgName} from "../../../utils/getImgName";
import {RootState} from "../../../store/store";
import {connect} from "react-redux";

interface OwnProps {
  type: "helper" | "leader";
  action: ACTION;
  actionItem: ACTION_ITEM;
  id: string;
  isDragDisabled?: boolean;
}

interface Props extends OwnProps {
  pawn: IPawnRenderData | undefined | null;
  marked: boolean;
}

function ActionSlot(props: Props) {
  let element: JSX.Element;

  const pawn = props.pawn;
  if (pawn) {
    element = <Pawn pawn={pawn} context={props.actionItem} index={1}/>;
  }
  const helperClass = props.type == "helper" ? styles.helper : "";

  return (
      <div
          className={`${styles.container} ${
              styles[getImgName(props.actionItem)]
          } ${helperClass}`}
          id={props.id}
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

function mapStateToProps(state: RootState, ownProps: OwnProps): Props {
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
