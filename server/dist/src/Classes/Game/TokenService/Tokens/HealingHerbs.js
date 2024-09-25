"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealingHerbs = void 0;
const Token_1 = require("./Token/Token");
const Invention_1 = require("../../../../shared/types/Game/InventionService/Invention");
const Token_2 = require("../../../../shared/types/Game/TokenService/Token");
class HealingHerbs extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.HEALING_HERBS, "zioła", "jeśli zbudowałeś Naczynia, otrzymujesz +1 do morali", id);
    }
    use(character, target) {
        if (this._game.inventionService.getInvention(Invention_1.INVENTION_STARTER.POT).isBuilt) {
            super.use(character);
            this._game.moraleService.lvlUp(1, this._sourceLog);
            this._used = true;
        }
        else {
            this._game.alertService.setAlert("Nie masz zbudowanych Naczyń.");
        }
    }
    autoDiscard() {
    }
}
exports.HealingHerbs = HealingHerbs;
//# sourceMappingURL=HealingHerbs.js.map