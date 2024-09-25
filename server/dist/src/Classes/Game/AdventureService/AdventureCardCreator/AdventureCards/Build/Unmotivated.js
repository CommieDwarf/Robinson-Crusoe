"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unmotivated = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class Unmotivated extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.UNMOTIVATED, "tools are breaking", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this._game.characterService.decrDeterminationOrGetHurt(resolver, 1, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(1, this._eventName);
    }
}
exports.Unmotivated = Unmotivated;
//# sourceMappingURL=Unmotivated.js.map