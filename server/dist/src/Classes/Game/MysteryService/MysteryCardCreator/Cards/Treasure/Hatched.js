"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hatched = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class Hatched extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HATCHED, false, "", 1);
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
    use() {
        this._game.tileService.campTile.addModifier("wood", this.name);
        this.removeFromOwnedResources();
    }
}
exports.Hatched = Hatched;
//# sourceMappingURL=Hatched.js.map