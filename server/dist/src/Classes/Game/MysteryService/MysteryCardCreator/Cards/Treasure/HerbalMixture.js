"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HerbalMixture = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class HerbalMixture extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HERBAL_MIXTURE, false, "", 1);
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
    use() {
        //TODO: implement
    }
}
exports.HerbalMixture = HerbalMixture;
//# sourceMappingURL=HerbalMixture.js.map