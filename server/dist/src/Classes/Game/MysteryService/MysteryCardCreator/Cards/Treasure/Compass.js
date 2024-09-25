"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compass = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const Pawn_1 = require("@shared/types/Game/Pawns/Pawn");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Compass extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.COMPASS, false, "", 0, "", "");
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
        this._pawnService.initPawns(1, false, Pawn_1.PAWN_HELPER_ACTION.EXPLORE);
    }
}
exports.Compass = Compass;
//# sourceMappingURL=Compass.js.map