"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Misadventure = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class Misadventure extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.MISADVENTURE, "swollen ankle", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        //TODO: implement wound
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: implement action reduction
        // to rest, arrange camp, build.
        // Discard wound
    }
}
exports.Misadventure = Misadventure;
//# sourceMappingURL=Misadventure.js.map