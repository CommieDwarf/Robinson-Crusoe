"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Corral = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
class Corral extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.CORRAL, { terrainType: null, inventions: [Invention_2.INVENTION_STARTER.ROPE] }, Invention_2.INVENTION_TYPE.NORMAL, game, { type: "wood", amount: 1 });
        this._tiles = null;
    }
    use() {
        const tiles = this._game.tileService.tilesAroundCamp;
        this._tiles = tiles;
        const canUse = tiles.some((tile) => tile.hasBasicResource("food"));
        if (canUse) {
            // this._game.tileService.markTileResourcesForAction(tiles, TILE_RESOURCE_ACTION.ADD_MODIFIER, this._namePL, "food");
            this._used = true;
        }
    }
    onDestruction() {
        super.onDestruction();
        if (this._tiles) {
            this._tiles.forEach((tile) => {
                tile.removeResourceModifier(null, "food", this._namePL);
            });
        }
    }
}
exports.Corral = Corral;
//# sourceMappingURL=Corral.js.map