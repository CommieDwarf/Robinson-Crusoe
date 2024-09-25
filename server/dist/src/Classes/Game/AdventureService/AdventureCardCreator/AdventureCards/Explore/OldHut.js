"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldHut = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class OldHut extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.OLD_HUT, "ghost of a castaway", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this.startDrawingMysteryCards(1, 0, 1, resolver, 1);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(1, this._eventName);
    }
}
exports.OldHut = OldHut;
//# sourceMappingURL=OldHut.js.map