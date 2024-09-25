"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignsOfFire = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class SignsOfFire extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SIGNS_OF_FIRE, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        const tile = this.getTile();
        // this._game.tileService.markTileResourcesForAction([tile], TILE_RESOURCE_ACTION.DEPLETE, this._name, null);
    }
}
exports.SignsOfFire = SignsOfFire;
//# sourceMappingURL=SignsOfFire.js.map