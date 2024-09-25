"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldGrave = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class OldGrave extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.OLD_GRAVE, "memories of the dead castaway", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this._game.characterService.decrDeterminationOrGetHurt(resolver, 1, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        const character = this.getPrimeCharacter();
        this._game.characterService.decrDeterminationOrGetHurt(character, 2, this._eventName);
    }
}
exports.OldGrave = OldGrave;
//# sourceMappingURL=OldGrave.js.map