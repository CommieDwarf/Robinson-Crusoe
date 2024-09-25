"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructionIsWeak = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("../../../../../../shared/types/Game/ConstructionService/Construction");
class ConstructionIsWeak extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.CONSTRUCTION_IS_WEAK, "bang!", false, game, "shuffle", "");
        this._eventNamePL = "trach!";
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        const construction = this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.ROOF);
        this._game.constructionService.setDividedLvlByTwoRoundedDown(Construction_1.CONSTRUCTION.ROOF, this._eventNamePL);
    }
}
exports.ConstructionIsWeak = ConstructionIsWeak;
//# sourceMappingURL=ConstructionIsWeak.js.map