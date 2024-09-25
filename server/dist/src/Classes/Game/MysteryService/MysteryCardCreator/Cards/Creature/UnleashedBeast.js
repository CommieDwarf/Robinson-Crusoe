"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnleashedBeast = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class UnleashedBeast extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.UNLEASHED_BEAST, false, "");
    }
    triggerDrawEffect(drawer) {
        if (this._game.beastService.deckCount > 0) {
            this._game.beastService.removeBeastFromDeck();
        }
    }
}
exports.UnleashedBeast = UnleashedBeast;
//# sourceMappingURL=UnleashedBeast.js.map