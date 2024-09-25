"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Treasure = void 0;
const Token_1 = require("./Token/Token");
const Token_2 = require("@shared/types/Game/TokenService/Token");
class Treasure extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.TREASURE, "znalezisko", "pociągnij 1 Skarb z talii Tajemnic", id);
    }
    use(character, target) {
        super.use(character);
        this._game.mysteryService.startDrawingCards(0, 0, 1, character);
        this._used = true;
    }
    autoDiscard() {
    }
}
exports.Treasure = Treasure;
//# sourceMappingURL=Treasure.js.map