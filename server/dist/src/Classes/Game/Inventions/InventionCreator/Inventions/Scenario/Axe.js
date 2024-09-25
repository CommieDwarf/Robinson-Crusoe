"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axe = void 0;
const Invention_1 = require("../../../../../../shared/types/Game/InventionService/Invention");
const ITile_1 = require("../../../../../../shared/types/Game/TileService/ITile");
const Invention_2 = require("../../Invention");
class Axe extends Invention_2.Invention {
    constructor(game) {
        super(Invention_1.INVENTION_CASTAWAYS.AXE, { terrainType: ITile_1.TERRAIN_TYPE.MOUNTAINS, inventions: null }, Invention_1.INVENTION_TYPE.SCENARIO, game, { type: "wood", amount: 1 });
    }
    onBuild() {
        super.onBuild();
        this._game.tileService.campTile.addModifier("wood", this._name);
    }
    onDestruction() {
        super.onDestruction();
        this._game.tileService.campTile.removeResourceModifier(null, "wood", this._name);
    }
}
exports.Axe = Axe;
//# sourceMappingURL=Axe.js.map