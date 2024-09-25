"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LackOfHope = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class LackOfHope extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.LACK_OF_HOPE, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        //todo: discard 3 inventions
    }
}
exports.LackOfHope = LackOfHope;
//# sourceMappingURL=LackOfHope.js.map