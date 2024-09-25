"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottleOfWine = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class BottleOfWine extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BOTTLE_OF_WINE, false, "", 1);
    }
    use(player) {
        super.use();
        this._game.characterService.heal(player.getCharacter(), 2, this._name);
        this.removeFromOwnedResources();
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
}
exports.BottleOfWine = BottleOfWine;
//# sourceMappingURL=BottleOfWine.js.map