"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotivationalSpeech = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("@shared/types/Game/Skill/ABILITY");
class MotivationalSpeech extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.MOTIVATIONAL_SPEECH, "all", null, 2, game, character);
    }
    use() {
        this._game.moraleService.lvlUp(1, this._name);
        super.use(null);
    }
}
exports.MotivationalSpeech = MotivationalSpeech;
//# sourceMappingURL=MotivationalSpeech.js.map