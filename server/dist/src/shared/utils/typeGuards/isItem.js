"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isItemRenderData = exports.isItem = void 0;
const Item_1 = require("@shared/types/Game/Equipment/Item");
function isItem(candidate) {
    return "name" in candidate && Object.values(Item_1.ITEM).includes(candidate.name);
}
exports.isItem = isItem;
function isItemRenderData(candidate) {
    return "name" in candidate && Object.values(Item_1.ITEM).includes(candidate.name);
}
exports.isItemRenderData = isItemRenderData;
//# sourceMappingURL=isItem.js.map