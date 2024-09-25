"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldClothes = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class OldClothes extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.OLD_CLOTHES, false, "", 0);
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
}
exports.OldClothes = OldClothes;
//# sourceMappingURL=OldClothes.js.map