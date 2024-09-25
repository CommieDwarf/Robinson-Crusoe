"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldRifle = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class OldRifle extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.OLD_RIFLE, false, "", 1);
    }
    use() {
        this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
        this.removeFromOwnedResources();
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
}
exports.OldRifle = OldRifle;
//# sourceMappingURL=OldRifle.js.map