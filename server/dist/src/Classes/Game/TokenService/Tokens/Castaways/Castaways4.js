"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Castaways4 = void 0;
const Token_1 = require("../Token/Token");
const Token_2 = require("@shared/types/Game/TokenService/Token");
class Castaways4 extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.SCENARIO_4, "medalik z portretem damy", "Daje 3 żetony determinacji.", id);
    }
    use(character, target) {
        super.use(character, target);
        this._game.characterService.incrDetermination(character, 3, this._sourceLog);
        this._used = true;
    }
    autoDiscard() {
    }
}
exports.Castaways4 = Castaways4;
//# sourceMappingURL=Castaways4.js.map