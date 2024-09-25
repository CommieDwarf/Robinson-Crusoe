"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinterFreezing = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class WinterFreezing extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.WINTER_FREEZING, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        const tile = this.getTile();
        // this._game.tileService.markTileResourcesForAction([tile], TILE_RESOURCE_ACTION.DEPLETE, this._name, null);
    }
}
exports.WinterFreezing = WinterFreezing;
//# sourceMappingURL=WinterFreezing.js.map