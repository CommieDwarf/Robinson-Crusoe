"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mast = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
class Mast extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_CASTAWAYS.MAST, { terrainType: null, inventions: [Invention_2.INVENTION_STARTER.ROPE] }, Invention_2.INVENTION_TYPE.SCENARIO, game, { type: "wood", amount: 1 });
    }
    onBuild() {
        super.onBuild();
        this._game.scenarioService.onItemUse(3, this._namePL);
    }
}
exports.Mast = Mast;
//# sourceMappingURL=Mast.js.map