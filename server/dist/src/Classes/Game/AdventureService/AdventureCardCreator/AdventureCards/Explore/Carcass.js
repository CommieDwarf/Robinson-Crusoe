"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carcass = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class Carcass extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.CARCASS, "diarrhea", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this._game.resourceService.addBasicResourceToFuture("food", 2, this._name);
        this._game.resourceService.addBasicResourceToFuture("leather", 1, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._eventName);
    }
}
exports.Carcass = Carcass;
//# sourceMappingURL=Carcass.js.map