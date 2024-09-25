"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortcut = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const TileResourceService_1 = require("@shared/types/Game/TileService/TileResourceService");
class Shortcut extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_PERSONAL.SHORTCUT, { terrainType: null, inventions: [Invention_2.INVENTION_STARTER.MAP] }, Invention_2.INVENTION_TYPE.PERSONAL, game);
    }
    get canBeUsed() {
        return this._game.tileService.tilesAroundCamp.filter((tile) => tile.isExplored).length > 0 && !this._used;
    }
    use() {
        const tileService = this._game.tileService;
        const tiles = tileService.tilesAroundCamp.filter((tile) => tile.isExplored);
        tileService.markTileResourcesForAction(tiles, TileResourceService_1.TILE_RESOURCE_ACTION.SET_SHORTCUT, this._name, null, 1, false);
        this._used = true;
    }
    onDestruction() {
        super.onDestruction();
        const tile = this._game.tileService.tiles.find((tile) => tile.hasShortcut);
        if (tile) {
            tile.unsetShortcut();
        }
        this._used = false;
    }
}
exports.Shortcut = Shortcut;
//# sourceMappingURL=Shortcut.js.map