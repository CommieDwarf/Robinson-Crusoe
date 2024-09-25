"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bow = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
const Construction_1 = require("../../../../../../shared/types/Game/ConstructionService/Construction");
class Bow extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.BOW, {
            terrainType: null,
            inventions: [Invention_2.INVENTION_STARTER.KNIFE, Invention_2.INVENTION_STARTER.ROPE],
        }, Invention_2.INVENTION_TYPE.NORMAL, game, { type: "wood", amount: 1 });
    }
    onBuild() {
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 3, this._logSource);
    }
    onDestruction() {
        super.onDestruction();
        this._game.constructionService.lvlDownIfPossible(Construction_1.CONSTRUCTION.WEAPON, 3, this._logSource);
    }
}
exports.Bow = Bow;
//# sourceMappingURL=Bow.js.map