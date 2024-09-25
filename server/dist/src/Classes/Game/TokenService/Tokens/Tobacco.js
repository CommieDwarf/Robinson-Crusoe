"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tobacco = void 0;
const Token_1 = require("./Token/Token");
const Token_2 = require("@shared/types/Game/TokenService/Token");
class Tobacco extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.TOBACCO, "tytoń", "Otrzymujesz +1 do morali.", id);
    }
    use(character, target) {
        super.use(character);
        this._game.moraleService.lvlUp(1, this._sourceLog);
        this._used = true;
    }
    autoDiscard() {
    }
}
exports.Tobacco = Tobacco;
//# sourceMappingURL=Tobacco.js.map