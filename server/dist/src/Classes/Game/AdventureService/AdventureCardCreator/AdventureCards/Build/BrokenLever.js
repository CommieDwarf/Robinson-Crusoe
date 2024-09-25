"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokenLever = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("../../../../../../shared/types/Game/ConstructionService/Construction");
class BrokenLever extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.BROKEN_LEVER, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.WEAPON, 1, this.name);
    }
}
exports.BrokenLever = BrokenLever;
//# sourceMappingURL=BrokenLever.js.map