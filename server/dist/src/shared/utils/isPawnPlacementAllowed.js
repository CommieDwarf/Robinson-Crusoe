"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPawnPlacementAllowed = void 0;
const getActionSlotDroppableId_1 = require("@shared/utils/getActionSlotDroppableId");
const ACTION_1 = require("@shared/types/Game/ACTION");
const isPlayerCharacter_1 = require("@shared/utils/typeGuards/isPlayerCharacter");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
function isPawnPlacementAllowed(pawn, droppableId) {
    if (!pawn) {
        return true;
    }
    // pawn -> pawn owner's droppable
    if (droppableId.includes("owner") && droppableId.includes(pawn.owner.name)) {
        return true;
    }
    else if (droppableId.includes("owner") && !droppableId.includes(pawn.owner.name)) {
        return false;
    }
    const droppableIdObject = (0, getActionSlotDroppableId_1.getDroppableIdObject)(droppableId);
    if (pawn.action) {
        if (!pawn.action.includes(uniqueActionToAction(droppableIdObject.itemType))
            || droppableId.includes("leader")) {
            return false;
        }
    }
    if (pawn.owner.name === "dog") {
        if ((droppableIdObject.itemType !== ACTION_1.ACTION.HUNT &&
            droppableIdObject.itemType !== ACTION_1.ACTION.EXPLORE) ||
            droppableIdObject.role !== "helper") {
            return false;
        }
    }
    if (droppableIdObject.itemType === ACTION_1.ACTION_ITEM.INVENTION) {
        if (Object.values(Invention_1.INVENTION_PERSONAL).includes(droppableIdObject.name) &&
            droppableIdObject.role === "leader") {
            if (!(0, isPlayerCharacter_1.isPlayerCharacter)(pawn.owner)) {
                return false;
            }
            if (droppableIdObject.name !== pawn.owner.invention) {
                return false;
            }
        }
    }
    return true;
}
exports.isPawnPlacementAllowed = isPawnPlacementAllowed;
function uniqueActionToAction(uniqueAction) {
    if (uniqueAction === ACTION_1.ACTION_ITEM.INVENTION || uniqueAction === ACTION_1.ACTION_ITEM.CONSTRUCTION) {
        return ACTION_1.ACTION.BUILD;
    }
    else {
        return uniqueAction;
    }
}
//# sourceMappingURL=isPawnPlacementAllowed.js.map