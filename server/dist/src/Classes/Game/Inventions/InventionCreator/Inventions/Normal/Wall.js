"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wall = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class Wall extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.WALL, { terrainType: null, inventions: [Invention_2.INVENTION_STARTER.BRICKS] }, Invention_2.INVENTION_TYPE.NORMAL, game);
    }
    onBuild() {
        super.onBuild();
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.PALISADE, 2, this._logSource);
    }
    onDestruction() {
        super.onDestruction();
        this._game.constructionService.lvlDownIfPossible(Construction_1.CONSTRUCTION.PALISADE, 2, this._logSource);
    }
}
exports.Wall = Wall;
//# sourceMappingURL=Wall.js.map