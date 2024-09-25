"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlayerCharacter = void 0;
const isPlayerCharacter = (candidate) => {
    return ("wounds" in candidate);
};
exports.isPlayerCharacter = isPlayerCharacter;
//# sourceMappingURL=isPlayerCharacter.js.map