"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vegetables = void 0;
const Token_1 = require("./Token/Token");
const Token_2 = require("@shared/types/Game/TokenService/Token");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
class Vegetables extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.VEGETABLES, "jadalne kłącza", "jeśli masz zbudowane Naczynia, ulecz 2 rany w fazie nocy.", id);
    }
    use(character, target) {
        if (this._game.phaseService.phase === "night") {
            super.use(character);
            if (this._game.inventionService.isBuilt(Invention_1.INVENTION_STARTER.POT)) {
                this._game.characterService.heal(character, 2, this._sourceLog);
                this._used = true;
            }
        }
        else {
            this._game.alertService.setAlert("Tego żetonu można użyć tylko w nocy.");
        }
    }
    autoDiscard() {
    }
}
exports.Vegetables = Vegetables;
//# sourceMappingURL=Vegetables.js.map