"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomicalConstruction = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("@shared/types/Game/Skill/ABILITY");
class EconomicalConstruction extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.ECONOMICAL_CONSTRUCTION, "all", null, 2, game, character);
    }
    use() {
        super.use(null);
        this._character.setPersonalResource("wood", true);
    }
}
exports.EconomicalConstruction = EconomicalConstruction;
//# sourceMappingURL=EconomicalConstruction.js.map