"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HowlingInTheBushes = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class HowlingInTheBushes extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.HOWLING_IN_THE_BUSHES, "the beast is here!", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //todo: implement fighting beast by prime player
    }
}
exports.HowlingInTheBushes = HowlingInTheBushes;
//# sourceMappingURL=HowlingInTheBushes.js.map