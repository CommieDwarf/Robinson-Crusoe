"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sling = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class Sling extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.SLING, { terrainType: null, inventions: null }, Invention_2.INVENTION_TYPE.NORMAL, game, { type: "wood", amount: 1 }, { type: "leather", amount: 1 });
        this._resourceChoice = true;
    }
    onBuild() {
        super.onBuild();
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 2, this._logSource);
    }
    onDestruction() {
        super.onDestruction();
        this._game.constructionService.lvlDownIfPossible(Construction_1.CONSTRUCTION.WEAPON, 2, this._logSource);
    }
}
exports.Sling = Sling;
//# sourceMappingURL=Sling.js.map