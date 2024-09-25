"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snare = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
const TileResourceService_1 = require("../../../../../../shared/types/Game/TileService/TileResourceService");
class Snare extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_PERSONAL.SNARE, { terrainType: null, inventions: [Invention_2.INVENTION_STARTER.ROPE] }, Invention_2.INVENTION_TYPE.PERSONAL, game);
        this._tile = null;
    }
    get canBeUsed() {
        return !this._used;
    }
    use() {
        const tile = this._game.tileService.campTile;
        this._game.tileService.markTileResourcesForAction([tile], TileResourceService_1.TILE_RESOURCE_ACTION.ADD_MODIFIER, this._name, null, 1, false);
        this._tile = tile;
        this._used = true;
    }
    onDestruction() {
        var _a, _b;
        super.onDestruction();
        (_a = this._tile) === null || _a === void 0 ? void 0 : _a.getSideByResource("food");
        (_b = this._tile) === null || _b === void 0 ? void 0 : _b.removeResourceModifier(null, "food", this.name);
        this._used = false;
    }
}
exports.Snare = Snare;
//# sourceMappingURL=Snare.js.map