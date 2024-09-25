"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Herbs = void 0;
const Token_1 = require("./Token/Token");
const Invention_1 = require("../../../../shared/types/Game/InventionService/Invention");
const Token_2 = require("../../../../shared/types/Game/TokenService/Token");
class Herbs extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.HERBS, "przyprawy", "Jeśli zbudowałeś Naczynia, budujesz Lek bez poświęcania akcji", id);
    }
    use(character, target) {
        if (this._game.inventionService.getInvention(Invention_1.INVENTION_STARTER.POT).isBuilt) {
            super.use(character);
            this._used = true;
            this._game.inventionService.build(Invention_1.INVENTION_STARTER.MEDICINE, character);
        }
        else {
            this._game.alertService.setAlert("Nie masz zbudowanych Naczyń.");
        }
    }
    autoDiscard() {
    }
}
exports.Herbs = Herbs;
//# sourceMappingURL=Herbs.js.map