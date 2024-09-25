"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friday = void 0;
const Character_1 = require("../../../../shared/types/Game/Characters/Character");
const SideCharacter_1 = require("./Character/SideCharacter/SideCharacter");
const ReRoll_1 = require("./Skills/Friday/ReRoll");
class Friday extends SideCharacter_1.SideCharacter {
    constructor(gender, game) {
        super(Character_1.CHARACTER.FRIDAY, 0, 4, game);
        this._skills = this.initSkills();
    }
    get abilities() {
        return this._skills;
    }
    initSkills() {
        return [new ReRoll_1.ReRoll(this._game, this)];
    }
}
exports.Friday = Friday;
//# sourceMappingURL=Friday.js.map