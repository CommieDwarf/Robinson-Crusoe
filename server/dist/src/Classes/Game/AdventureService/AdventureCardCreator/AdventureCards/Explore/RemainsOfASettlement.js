"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemainsOfASettlement = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class RemainsOfASettlement extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.REMAINS_OF_A_SETTLEMENT, "epidemic", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this.startDrawingMysteryCards(0, 1, 2, resolver);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._eventName);
    }
}
exports.RemainsOfASettlement = RemainsOfASettlement;
//# sourceMappingURL=RemainsOfASettlement.js.map