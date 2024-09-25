"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemFromDroppableId = void 0;
const ACTION_1 = require("../shared/types/Game/ACTION");
const getActionSlotDroppableId_1 = require("../shared/utils/getActionSlotDroppableId");
function getItemFromDroppableId(droppableId, game) {
    const obj = (0, getActionSlotDroppableId_1.getDroppableIdObject)(droppableId);
    switch (true) {
        case obj.itemType === ACTION_1.ACTION.THREAT:
            return game.eventService[obj.side];
        case obj.itemType === ACTION_1.ACTION_ITEM.CONSTRUCTION:
            return game.constructionService.getConstruction(obj.name);
        case obj.itemType === ACTION_1.ACTION_ITEM.INVENTION:
            return game.inventionService.getInvention(obj.name);
        case obj.itemType === ACTION_1.ACTION.EXPLORE || obj.itemType === ACTION_1.ACTION.GATHER:
            return game.tileService.getTile(Number(obj.name));
        case obj.itemType === ACTION_1.ACTION.HUNT:
            return game.beastService.peekBeastFromDeck();
        default:
            return obj.itemType || ACTION_1.ACTION.REST;
    }
}
exports.getItemFromDroppableId = getItemFromDroppableId;
//# sourceMappingURL=getItemFromDroppableId.js.map