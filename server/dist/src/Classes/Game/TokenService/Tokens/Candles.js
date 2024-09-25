"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candles = void 0;
const Token_1 = require("./Token/Token");
const Pawn_1 = require("../../../../shared/types/Game/Pawns/Pawn");
const Token_2 = require("../../../../shared/types/Game/TokenService/Token");
class Candles extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.CANDLES, "świece", "Jednorazowy brązowy pionek dodatkowy do Akcji Budowy", id);
    }
    use(character, target) {
        super.use(character, target);
        character.pawnService.addPawn(true, Pawn_1.PAWN_HELPER_ACTION.BUILD);
        this._used = true;
    }
    autoDiscard() {
    }
}
exports.Candles = Candles;
//# sourceMappingURL=Candles.js.map