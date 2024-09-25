"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candles = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const Pawn_1 = require("@shared/types/Game/Pawns/Pawn");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Candles extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CANDLES, false, "", 0, "", "");
    }
    addToResources() {
        super.addToResources();
        this._pawnService.initPawns(2, true, Pawn_1.PAWN_HELPER_ACTION.BUILD);
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
}
exports.Candles = Candles;
//# sourceMappingURL=Candles.js.map