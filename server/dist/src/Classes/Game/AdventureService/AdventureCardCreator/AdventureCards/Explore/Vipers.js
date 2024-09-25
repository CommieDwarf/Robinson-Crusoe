"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vipers = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class Vipers extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.VIPERS, "fewer", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        //TODO: put wound.
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: implement.
    }
}
exports.Vipers = Vipers;
//# sourceMappingURL=Vipers.js.map