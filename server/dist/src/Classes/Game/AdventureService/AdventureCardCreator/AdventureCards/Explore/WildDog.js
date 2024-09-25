"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WildDog = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class WildDog extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.WILD_DOG, "old buddy", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        const character = this.getPrimeCharacter();
        this._game.characterService.hurt(character, 1, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: implement decision
    }
}
exports.WildDog = WildDog;
//# sourceMappingURL=WildDog.js.map