"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptainStonesSpyglass = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class CaptainStonesSpyglass extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CAPTAIN_STONES_SPYGLASS, false, "", 1);
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
    use(target) {
        super.use(target);
        //TODO: reveal 3 tiles and place them on top of stack in preferred order.
    }
}
exports.CaptainStonesSpyglass = CaptainStonesSpyglass;
//# sourceMappingURL=CaptainStonesSpyglass.js.map