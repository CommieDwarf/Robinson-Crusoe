"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMysteryCard = void 0;
const isMysteryCard = (candidate) => {
    return ("drawLabel" in candidate);
};
exports.isMysteryCard = isMysteryCard;
//# sourceMappingURL=isMysteryCard.js.map