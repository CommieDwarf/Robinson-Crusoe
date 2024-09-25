"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostInTheThicket = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class LostInTheThicket extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.LOST_IN_THE_THICKET, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        //TODO: implement camp out of camp and pull discovery token just before event Phase
    }
}
exports.LostInTheThicket = LostInTheThicket;
//# sourceMappingURL=LostInTheThicket.js.map