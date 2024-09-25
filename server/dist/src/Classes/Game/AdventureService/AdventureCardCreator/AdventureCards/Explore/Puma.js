"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Puma = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class Puma extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.PUMA, "puma is attacking!", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
        //TODO: implement night out of camp.
    }
    resolveOption2(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: fight puma
    }
}
exports.Puma = Puma;
//# sourceMappingURL=Puma.js.map