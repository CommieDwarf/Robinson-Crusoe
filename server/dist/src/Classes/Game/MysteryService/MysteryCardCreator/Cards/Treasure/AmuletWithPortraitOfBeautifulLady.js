"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmuletWithPortraitOfBeautifulLady = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class AmuletWithPortraitOfBeautifulLady extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.AMULET_WITH_PORTRAIT_OF_BEAUTIFUL_LADY, false, "", 1);
        this._requiresTargeting = true;
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
    use() {
        this._game.characterService.markThresholdsForRemoval(2);
        super.use();
    }
}
exports.AmuletWithPortraitOfBeautifulLady = AmuletWithPortraitOfBeautifulLady;
//# sourceMappingURL=AmuletWithPortraitOfBeautifulLady.js.map