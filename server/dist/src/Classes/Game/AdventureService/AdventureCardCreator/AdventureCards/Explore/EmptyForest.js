"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyForest = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class EmptyForest extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.EMPTY_FOREST, "hungry predators", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: implement token at hunt which makes beast stronger.
    }
}
exports.EmptyForest = EmptyForest;
//# sourceMappingURL=EmptyForest.js.map