"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knife = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const ITile_1 = require("@shared/types/Game/TileService/ITile");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class Knife extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_STARTER.KNIFE, { terrainType: ITile_1.TERRAIN_TYPE.MOUNTAINS, inventions: null }, Invention_2.INVENTION_TYPE.STARTER, game);
    }
    onBuild() {
        super.onBuild();
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 1, this._logSource);
    }
    onDestruction() {
        super.onDestruction();
        this._game.constructionService.lvlDownIfPossible(Construction_1.CONSTRUCTION.WEAPON, 1, this._logSource);
    }
}
exports.Knife = Knife;
//# sourceMappingURL=Knife.js.map