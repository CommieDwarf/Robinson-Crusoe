"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeremonialBowl = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class CeremonialBowl extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CEREMONIAL_BOWL, true, "curse defeated!", 0);
    }
    triggerDrawEffect(drawer) {
        //TODO: implement reroll token on drawer.
    }
    triggerEventEffect() {
        //TODO: implement delete reroll token on drawer.
    }
}
exports.CeremonialBowl = CeremonialBowl;
//# sourceMappingURL=CeremonialBowl.js.map