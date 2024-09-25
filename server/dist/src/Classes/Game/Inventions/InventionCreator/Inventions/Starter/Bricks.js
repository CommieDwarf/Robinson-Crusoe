"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bricks = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const ITile_1 = require("@shared/types/Game/TileService/ITile");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class Bricks extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_STARTER.BRICKS, { terrainType: ITile_1.TERRAIN_TYPE.HILLS, inventions: null }, Invention_2.INVENTION_TYPE.STARTER, game);
    }
    onBuild() {
        super.onBuild();
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.PALISADE, 1, this._logSource);
    }
    onDestruction() {
        super.onDestruction();
        this._game.constructionService.lvlDownIfPossible(Construction_1.CONSTRUCTION.PALISADE, 1, this._logSource);
    }
}
exports.Bricks = Bricks;
//# sourceMappingURL=Bricks.js.map