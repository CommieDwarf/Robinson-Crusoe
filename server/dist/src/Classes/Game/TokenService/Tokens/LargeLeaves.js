"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LargeLeaves = void 0;
const Token_1 = require("./Token/Token");
const Token_2 = require("@shared/types/Game/TokenService/Token");
class LargeLeaves extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.LARGE_LEAVES, "wielkie liście", "Odejmij jedną deszczową chmurę.", id);
    }
    use(character, target) {
        if (this._game.phaseService.phase === "weather") {
            if (this._game.weatherService.getOverallWeather().rain === 0) {
                this._game.alertService.setAlert("Nie ma żadnej deszczowej chmury.");
            }
            else {
                super.use(character);
                this._game.weatherService.incrementModifier("rain", -1, this._sourceLog);
                this._used = true;
            }
        }
        else {
            this._game.alertService.setAlert("Tego tokenu można użyć tylko w fazie pogody.");
        }
    }
    autoDiscard() {
    }
}
exports.LargeLeaves = LargeLeaves;
//# sourceMappingURL=LargeLeaves.js.map