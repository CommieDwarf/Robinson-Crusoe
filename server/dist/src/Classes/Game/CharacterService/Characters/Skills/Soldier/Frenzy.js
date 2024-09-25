"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frenzy = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("@shared/types/Game/Skill/ABILITY");
class Frenzy extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.FRENZY, "all", null, 3, game, character);
    }
    use() {
        super.use(null);
        this._character.weaponBoost += 3;
    }
}
exports.Frenzy = Frenzy;
//# sourceMappingURL=Frenzy.js.map