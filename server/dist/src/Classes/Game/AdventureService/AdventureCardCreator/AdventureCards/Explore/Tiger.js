"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tiger = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class Tiger extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.TIGER, "the tiger has found you", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
        //TODO: night out of camp.
    }
    resolveOption2(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: JUMP, JUMP
        //TODO: JUMP ON THE TIGER
    }
}
exports.Tiger = Tiger;
//# sourceMappingURL=Tiger.js.map