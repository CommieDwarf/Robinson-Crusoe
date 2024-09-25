"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flu = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class Flu extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.FLU, "sore throat", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
        this._game.resourceService.spendBasicResourceOrGetHurt("food", 1, this._name);
    }
    resolveOption2(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: implement double food consumption or get hurt.
    }
}
exports.Flu = Flu;
//# sourceMappingURL=Flu.js.map