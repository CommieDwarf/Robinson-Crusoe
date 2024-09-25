"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spear = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class Spear extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_PERSONAL.SPEAR, { terrainType: null, inventions: [Invention_2.INVENTION_STARTER.KNIFE] }, Invention_2.INVENTION_TYPE.PERSONAL, game, { type: "wood", amount: 1 });
    }
    onBuild() {
        super.onBuild();
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 3, this._name);
    }
    onDestruction() {
        super.onDestruction();
        this._game.constructionService.lvlDownIfPossible(Construction_1.CONSTRUCTION.WEAPON, 3, this._name);
    }
}
exports.Spear = Spear;
//# sourceMappingURL=Spear.js.map