"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YouNeedABiggerCamp = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class YouNeedABiggerCamp extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.YOU_NEED_A_BIGGER_CAMP, "camp expansion", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: implement +1 wood consumption on every construction
    }
}
exports.YouNeedABiggerCamp = YouNeedABiggerCamp;
//# sourceMappingURL=YouNeedABiggerCamp.js.map