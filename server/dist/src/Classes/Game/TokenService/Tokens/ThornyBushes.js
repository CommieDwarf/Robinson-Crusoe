"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThornyBushes = void 0;
const Token_1 = require("./Token/Token");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const Token_2 = require("@shared/types/Game/TokenService/Token");
class ThornyBushes extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.THORNY_BUSHES, "cierniste krzewy", "Jeśli schronienie jest zbudowane, otrzymujesz +1 do palisady.", id);
    }
    use(character, target) {
        if (this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.SHELTER).lvl >
            0) {
            super.use(character);
            this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.PALISADE, 1, this._sourceLog);
            this._used = true;
        }
    }
    autoDiscard() {
    }
}
exports.ThornyBushes = ThornyBushes;
//# sourceMappingURL=ThornyBushes.js.map