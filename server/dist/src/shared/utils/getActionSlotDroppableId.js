"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDroppableIdObject = exports.getActionSlotDroppableId = void 0;
const ACTION_1 = require("@shared/types/Game/ACTION");
function getActionSlotDroppableId(itemType, name, side, id) {
    const role = id === 0 || itemType === ACTION_1.ACTION.ARRANGE_CAMP || itemType === ACTION_1.ACTION.REST ? "leader" : "helper";
    if (itemType === ACTION_1.ACTION.THREAT || itemType === ACTION_1.ACTION.HUNT) {
        name = " ";
    }
    return `${itemType}-${name}-${side ? side : " "}-${role}-${id}`;
}
exports.getActionSlotDroppableId = getActionSlotDroppableId;
function getDroppableIdObject(droppableId) {
    const arr = droppableId.split("-");
    return {
        itemType: arr[0],
        name: arr[1],
        side: arr[2],
        role: arr[3],
        id: arr[4],
    };
}
exports.getDroppableIdObject = getDroppableIdObject;
//# sourceMappingURL=getActionSlotDroppableId.js.map