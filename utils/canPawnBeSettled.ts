import {IPawnRenderData,} from "../interfaces/Pawns/Pawn";
import {getDroppableIdObject} from "./getActionSlotDroppableId";
import {ACTION} from "../interfaces/ACTION";

export function canPawnBeSettled(
    pawn: null | IPawnRenderData<any>,
    droppableId: string
): boolean {
    if (!pawn) {
        return true;
    }


    // pawn -> pawn owner's droppable
    if (droppableId.includes("owner") && droppableId.includes(pawn.owner.name)) {
        return true;
    } else if (droppableId.includes("owner") && !droppableId.includes(pawn.owner.name)) {
        return false;
    }

    const droppableIdObject = getDroppableIdObject(droppableId);

    if (pawn.action && (!pawn.action.includes(droppableIdObject.itemType) || droppableId.includes("leader"))) {
        return false;
    }

    if (pawn.owner.name === "dog") {
        return ((droppableIdObject.itemType === ACTION.HUNT || droppableIdObject.itemType === ACTION.EXPLORE) && droppableIdObject.role === "helper")
    }


    return true;
}

