"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldMachete = void 0;
const Token_1 = require("./Token/Token");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const Token_2 = require("@shared/types/Game/TokenService/Token");
class OldMachete extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.OLD_MACHETE, "stara maczeta", "Otrzymujesz +1 do broni", id);
    }
    use(character, target) {
        super.use(character);
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 1, this._sourceLog);
        this._used = true;
    }
    autoDiscard() {
    }
}
exports.OldMachete = OldMachete;
//# sourceMappingURL=OldMachete.js.map