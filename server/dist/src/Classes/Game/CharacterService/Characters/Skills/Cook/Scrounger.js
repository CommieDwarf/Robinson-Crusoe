"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scrounger = void 0;
const Ability_1 = require("../Ability/Ability");
const Phase_1 = require("@shared/types/Game/PhaseService/Phase");
const ACTION_1 = require("@shared/types/Game/ACTION");
const ABILITY_1 = require("@shared/types/Game/Skill/ABILITY");
class Scrounger extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.SCROUNGER, [Phase_1.PHASE.ACTION], ACTION_1.ACTION.GATHER, 2, game, character);
    }
    use(target) {
        if (!target) {
            throw new Error("this error requires target");
        }
        if (this._game.actionService.action !== ACTION_1.ACTION.GATHER) {
            this._game.alertService.setAlert("Tej umiejętności można użyć tylko na kostkach zbierania");
        }
        if (this._game.actionService.lastRolledItem) {
            super.use(target);
            this._game.actionService.reRollDice(target);
        }
    }
}
exports.Scrounger = Scrounger;
//# sourceMappingURL=Scrounger.js.map