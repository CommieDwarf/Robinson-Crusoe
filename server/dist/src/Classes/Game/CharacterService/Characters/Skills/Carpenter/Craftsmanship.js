"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Craftsmanship = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("../../../../../../shared/types/Game/Skill/ABILITY");
const Phase_1 = require("../../../../../../shared/types/Game/PhaseService/Phase");
const ACTION_1 = require("../../../../../../shared/types/Game/ACTION");
class Craftsmanship extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.CRAFTSMANSHIP, [Phase_1.PHASE.ACTION], ACTION_1.ACTION.BUILD, 2, game, character);
    }
    use(target) {
        super.use(target);
        this._game.actionService.reRollDice(target);
    }
}
exports.Craftsmanship = Craftsmanship;
//# sourceMappingURL=Craftsmanship.js.map