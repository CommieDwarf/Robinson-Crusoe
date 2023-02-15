import React from "react";
import styles from "./ActionSlot.module.css";
import { Droppable } from "react-beautiful-dnd";

import Pawn from "./Pawn";
import { IPawnRenderData } from "../../../interfaces/Pawns/Pawn";
import { ACTION } from "../../../interfaces/ACTION";
import { ACTION_ITEM } from "../../../utils/getDroppableID";
import { getImgName } from "../../../utils/getImgName";
import { useAppSelector } from "../../../store/hooks";

interface Props {
  type: "helper" | "leader";
  action: ACTION;
  context: ACTION_ITEM;
  id: string;
  isDragDisabled?: boolean;
}

export default function PlayerSlot(props: Props) {
  let element: JSX.Element;
  const actionSlots = useAppSelector((state) => state.actionSlots.slots);

  const pawn = actionSlots[props.id];
  if (pawn) {
    element = <Pawn pawn={pawn} context={props.context} index={1} />;
  }
  const helperClass = props.type == "helper" ? styles.helper : "";

  return (
    <div
      className={`${styles.container} ${
        styles[getImgName(props.context)]
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
            >
              {element}
              <div style={{ display: "none" }}>{provided.placeholder}</div>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
