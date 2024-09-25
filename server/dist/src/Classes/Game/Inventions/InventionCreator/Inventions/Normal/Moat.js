"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moat = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class Moat extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.MOAT, { terrainType: null, inventions: [Invention_2.INVENTION_STARTER.SHOVEL] }, Invention_2.INVENTION_TYPE.NORMAL, game, { type: "wood", amount: 1 });
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
exports.Moat = Moat;
//# sourceMappingURL=Moat.js.map