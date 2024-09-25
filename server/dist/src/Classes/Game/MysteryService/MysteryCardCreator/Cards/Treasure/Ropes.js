"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ropes = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Ropes extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.ROPES, false, "", 0);
    }
    triggerDrawEffect(drawer) {
    }
}
exports.Ropes = Ropes;
//# sourceMappingURL=Ropes.js.map