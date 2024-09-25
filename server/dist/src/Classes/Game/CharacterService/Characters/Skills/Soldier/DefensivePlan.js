"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefensivePlan = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("../../../../../../shared/types/Game/Skill/ABILITY");
const Construction_1 = require("../../../../../../shared/types/Game/ConstructionService/Construction");
class DefensivePlan extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.DEFENSIVE_PLAN, "all", null, 3, game, character);
    }
    use() {
        super.use(null);
        const isShelterBuilt = this._game.constructionService.isBuilt(Construction_1.CONSTRUCTION.SHELTER);
        this._game.startPickingObject([Construction_1.CONSTRUCTION.WEAPON, Construction_1.CONSTRUCTION.PALISADE], this._character, 0, this._name, "construction", () => {
            this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 1, this._name);
        }, isShelterBuilt ? () => {
            this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.PALISADE, 1, this._name);
        } : undefined);
    }
}
exports.DefensivePlan = DefensivePlan;
//# sourceMappingURL=DefensivePlan.js.map