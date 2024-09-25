"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lost = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class Lost extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.LOST, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        //TODO: implement night out of camp and Morale down just before event Phase
    }
}
exports.Lost = Lost;
//# sourceMappingURL=Lost.js.map