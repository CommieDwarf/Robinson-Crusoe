"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lucky = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("@shared/types/Game/Skill/ABILITY");
const Phase_1 = require("@shared/types/Game/PhaseService/Phase");
const ACTION_1 = require("@shared/types/Game/ACTION");
class Lucky extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.LUCKY, [Phase_1.PHASE.ACTION], ACTION_1.ACTION.EXPLORE, 2, game, character);
    }
    use(target) {
        if (!target) {
            throw new Error("This ability requires target");
        }
        if (this._game.actionService.action !== ACTION_1.ACTION.EXPLORE) {
            return;
        }
        if (this._game.actionService.lastRolledItem) {
            this._game.actionService.reRollDice(target);
            super.use(target);
        }
    }
}
exports.Lucky = Lucky;
//# sourceMappingURL=Lucky.js.map