"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = void 0;
const SideCharacter_1 = require("./Character/SideCharacter/SideCharacter");
const Character_1 = require("../../../../shared/types/Game/Characters/Character");
class Dog extends SideCharacter_1.SideCharacter {
    constructor(gender, game) {
        super(Character_1.CHARACTER.DOG, 1, Infinity, game);
        this._skills = [];
    }
}
exports.Dog = Dog;
//# sourceMappingURL=Dog.js.map