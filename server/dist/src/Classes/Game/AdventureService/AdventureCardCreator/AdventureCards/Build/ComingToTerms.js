"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComingToTerms = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class ComingToTerms extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.COMING_TO_TERMS, "lack of ideas", false, game, "shuffle", "");
        this._eventNamePL = "brak pomysłów";
    }
    resolveOption1(resolver) {
        //TODO: implement discarding inventions.
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventNamePL);
    }
}
exports.ComingToTerms = ComingToTerms;
//# sourceMappingURL=ComingToTerms.js.map