"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretCave = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class SecretCave extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SECRET_CAVE, "awakening of the beast", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        //TODO: implement option 1 creature and 2 treasures OR 1 trap and 2 treasures in the future.
        this.startDrawingMysteryCards(1, 0, 2, resolver);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: fight beast.
    }
}
exports.SecretCave = SecretCave;
//# sourceMappingURL=SecretCave.js.map