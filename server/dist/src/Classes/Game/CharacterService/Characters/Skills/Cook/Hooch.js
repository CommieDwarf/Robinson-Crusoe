"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hooch = void 0;
const Ability_1 = require("../Ability/Ability");
const Phase_1 = require("@shared/types/Game/PhaseService/Phase");
const ABILITY_1 = require("@shared/types/Game/Skill/ABILITY");
class Hooch extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.HOOCH, [Phase_1.PHASE.WEATHER], null, 3, game, character);
    }
    use(target) {
        if (!target) {
            throw new Error("this ability required target");
        }
        super.use(target);
        if (target === "rain") {
            this._game.weatherService.incrementModifier(target, -1, this._name);
        }
        else {
            this._game.weatherService.incrementModifier(target, -1, this._name);
            this._game.weatherService.incrementModifier("rain", 1, this._name);
        }
    }
    canBeUsed() {
        const overallWeather = this._game.weatherService.getOverallWeather();
        return super.canBeUsed() && overallWeather.snow > 0 || overallWeather.rain > 0;
    }
}
exports.Hooch = Hooch;
//# sourceMappingURL=Hooch.js.map