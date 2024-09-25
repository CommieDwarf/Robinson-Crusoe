"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tired = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class Tired extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.TIRED, "dispute", true, game, "shuffle", "discard");
    }
    resolveOption1(resolver) {
        this._game.characterService.heal(resolver, 2, this.name);
        this.shuffleIntoEventDeck();
    }
    resolveOption2(resolver) {
    }
    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventName);
    }
}
exports.Tired = Tired;
//# sourceMappingURL=Tired.js.map