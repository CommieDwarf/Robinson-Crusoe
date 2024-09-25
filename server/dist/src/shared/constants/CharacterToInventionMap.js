"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterToInventionMap = void 0;
const Character_1 = require("../types/Game/Characters/Character");
const Invention_1 = require("../types/Game/InventionService/Invention");
exports.characterToInventionMap = {
    [Character_1.CHARACTER.SOLDIER]: Invention_1.INVENTION_PERSONAL.SPEAR,
    [Character_1.CHARACTER.COOK]: Invention_1.INVENTION_PERSONAL.FIREPLACE,
    [Character_1.CHARACTER.DOG]: "",
    [Character_1.CHARACTER.FRIDAY]: "",
    [Character_1.CHARACTER.CARPENTER]: Invention_1.INVENTION_PERSONAL.SNARE,
    [Character_1.CHARACTER.EXPLORER]: Invention_1.INVENTION_PERSONAL.SHORTCUT,
};
//# sourceMappingURL=CharacterToInventionMap.js.map