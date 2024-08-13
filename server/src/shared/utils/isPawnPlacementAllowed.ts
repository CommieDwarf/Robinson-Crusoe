import {getDroppableIdObject} from "@shared/utils/getActionSlotDroppableId";
import {IPawnRenderData} from "@shared/types/Game/Pawns/Pawn";
import {ACTION, ACTION_ITEM, UniqueAction} from "@shared/types/Game/ACTION";
import {isPlayerCharacter} from "@shared/utils/typeGuards/isPlayerCharacter";
import {INVENTION_PERSONAL} from "@shared/types/Game/InventionService/Invention";


export function isPawnPlacementAllowed(
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


    if (pawn.action) {
        if (!pawn.action.includes(uniqueActionToAction(droppableIdObject.itemType))
            || droppableId.includes("leader")) {
            return false;
        }
    }

    if (pawn.owner.name === "dog") {
        if ((droppableIdObject.itemType !== ACTION.HUNT &&
                droppableIdObject.itemType !== ACTION.EXPLORE) ||
            droppableIdObject.role !== "helper") {
            return false;
        }
    }

    if (droppableIdObject.itemType === ACTION_ITEM.INVENTION) {
        if (Object.values(INVENTION_PERSONAL).includes(droppableIdObject.name as INVENTION_PERSONAL) &&
            droppableIdObject.role === "leader"
        ) {
            if (!isPlayerCharacter(pawn.owner)) {
                return false;
            }
            if (droppableIdObject.name !== pawn.owner.invention) {
                return false;
            }
        }

    }

    return true;
}


function uniqueActionToAction(uniqueAction: UniqueAction) {
    if (uniqueAction === ACTION_ITEM.INVENTION || uniqueAction === ACTION_ITEM.CONSTRUCTION) {
        return ACTION.BUILD
    } else {
        return uniqueAction as ACTION;
    }
}
