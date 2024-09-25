"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdventureCardRenderData = exports.isAdventureCard = void 0;
const isAdventureCard = (candidate) => {
    return ("action" in candidate);
};
exports.isAdventureCard = isAdventureCard;
const isAdventureCardRenderData = (candidate) => {
    return ("action" in candidate);
};
exports.isAdventureCardRenderData = isAdventureCardRenderData;
//# sourceMappingURL=isAdventureCard.js.map