"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReRoll = void 0;
const Ability_1 = require("../Ability/Ability");
const Phase_1 = require("@shared/types/Game/PhaseService/Phase");
const ABILITY_1 = require("@shared/types/Game/Skill/ABILITY");
class ReRoll extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.FRIDAYS_ABILITY, [Phase_1.PHASE.ACTION], null, 2, game, character);
    }
    use(target) {
        if (!target) {
            throw new Error("This ability requires target");
        }
        if (this._game.actionService.lastRolledItem) {
            super.use(target);
            this._game.actionService.reRollDice(target);
        }
    }
}
exports.ReRoll = ReRoll;
//# sourceMappingURL=ReRoll.js.map