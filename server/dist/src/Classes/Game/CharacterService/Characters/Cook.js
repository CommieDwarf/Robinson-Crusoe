"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cook = void 0;
const PlayerCharacter_1 = require("./Character/PlayerCharacter/PlayerCharacter");
const Character_1 = require("@shared/types/Game/Characters/Character");
const GrandmasRecipe_1 = require("./Skills/Cook/GrandmasRecipe");
const Hooch_1 = require("./Skills/Cook/Hooch");
const Scrounger_1 = require("./Skills/Cook/Scrounger");
const StoneSoup_1 = require("./Skills/Cook/StoneSoup");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
class Cook extends PlayerCharacter_1.PlayerCharacter {
    constructor(gender, game, player) {
        super(Character_1.CHARACTER.COOK, 2, 13, game, gender, [2, 4, 6, 9], Invention_1.INVENTION_PERSONAL.FIREPLACE, player);
        this._skills = this.initSkills();
    }
    get abilities() {
        return this._skills;
    }
    initSkills() {
        const skills = [];
        skills.push(new GrandmasRecipe_1.GrandmasRecipe(this._game, this));
        skills.push(new Hooch_1.Hooch(this._game, this));
        skills.push(new Scrounger_1.Scrounger(this._game, this));
        skills.push(new StoneSoup_1.StoneSoup(this._game, this));
        return skills;
    }
}
exports.Cook = Cook;
//# sourceMappingURL=Cook.js.map