"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastWork = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("../../../../../../shared/types/Game/ConstructionService/Construction");
class FastWork extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.FAST_WORK, "haste makes waste", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        //TODO: implement building another item + rolling dices for it
    }
    triggerEventEffect() {
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.PALISADE, 1, this._eventName);
    }
}
exports.FastWork = FastWork;
//# sourceMappingURL=FastWork.js.map