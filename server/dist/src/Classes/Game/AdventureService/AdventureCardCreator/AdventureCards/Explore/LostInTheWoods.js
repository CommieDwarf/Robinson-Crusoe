"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostInTheWoods = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class LostInTheWoods extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOODS, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        this._game.characterService.decrDeterminationOrGetHurt(resolver, 2, this._name);
    }
}
exports.LostInTheWoods = LostInTheWoods;
//# sourceMappingURL=LostInTheWoods.js.map