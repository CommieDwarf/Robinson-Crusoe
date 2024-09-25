"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DangerousTerrain = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class DangerousTerrain extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.DANGEROUS_TERRAIN, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        //TODO: implement beast token on tile and requirement 1 weapon or get hurt on any action on this tile.
        this.getTile().setTileModifier("greaterDanger", this._name);
    }
}
exports.DangerousTerrain = DangerousTerrain;
//# sourceMappingURL=DangerousTerrain.js.map