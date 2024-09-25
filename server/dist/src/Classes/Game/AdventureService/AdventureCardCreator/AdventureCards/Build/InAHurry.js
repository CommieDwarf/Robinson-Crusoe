"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAHurry = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("../../../../../../shared/types/Game/ConstructionService/Construction");
class InAHurry extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.IN_A_HURRY, "snap!", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this._game.tokenService.addRandomTokensToOwned(2);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.PALISADE, 1, this.eventName);
    }
}
exports.InAHurry = InAHurry;
//# sourceMappingURL=InAHurry.js.map