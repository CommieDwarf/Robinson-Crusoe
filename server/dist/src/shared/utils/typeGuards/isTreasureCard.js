"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTreasureCardRenderData = exports.isTreasureCard = void 0;
function isTreasureCard(candidate) {
    return "uses" in candidate;
}
exports.isTreasureCard = isTreasureCard;
function isTreasureCardRenderData(candidate) {
    return "uses" in candidate;
}
exports.isTreasureCardRenderData = isTreasureCardRenderData;
//# sourceMappingURL=isTreasureCard.js.map