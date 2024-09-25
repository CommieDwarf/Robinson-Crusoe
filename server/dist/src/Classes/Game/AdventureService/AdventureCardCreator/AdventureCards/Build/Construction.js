"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Construction = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class Construction extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.CONSTRUCTION, "stronger construction", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        if (this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.SHELTER).lvl >
            0) {
            this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.PALISADE, 1, this._eventName);
        }
    }
}
exports.Construction = Construction;
//# sourceMappingURL=Construction.js.map