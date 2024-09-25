"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swamp = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class Swamp extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SWAMP, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        this.getTile().setTileModifier("timeConsumingAction", this._name);
    }
}
exports.Swamp = Swamp;
//# sourceMappingURL=Swamp.js.map