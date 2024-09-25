"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breakdown = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class Breakdown extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.BREAKDOWN, "it's going well", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this._game.moraleService.lvlDown(1, this.name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        const character = this._game.playerService.primePlayer.getCharacter();
        this._game.characterService.incrDetermination(character, 2, this._eventName);
    }
}
exports.Breakdown = Breakdown;
//# sourceMappingURL=Breakdown.js.map