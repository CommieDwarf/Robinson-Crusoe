"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poison = void 0;
const Token_1 = require("./Token/Token");
const Token_2 = require("../../../../shared/types/Game/TokenService/Token");
const Invention_1 = require("../../../../shared/types/Game/InventionService/Invention");
const Construction_1 = require("../../../../shared/types/Game/ConstructionService/Construction");
class Poison extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.POISON, "trujące pędy", "Jeśli masz zbudowane Naczynia, otrzymujesz +2 do broni", id);
    }
    use(character, target) {
        if (this._game.inventionService.getInvention(Invention_1.INVENTION_STARTER.POT).isBuilt) {
            super.use(character);
            this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 2, this._sourceLog);
            this._used = true;
        }
        else {
            this._game.alertService.setAlert("Nie masz zbudowanych Naczyń.");
        }
    }
    autoDiscard() {
    }
}
exports.Poison = Poison;
//# sourceMappingURL=Poison.js.map