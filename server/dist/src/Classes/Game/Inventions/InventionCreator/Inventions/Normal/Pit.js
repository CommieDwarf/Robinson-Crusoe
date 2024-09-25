"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pit = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
class Pit extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.PIT, {
            terrainType: null,
            inventions: [Invention_2.INVENTION_STARTER.SHOVEL],
        }, Invention_2.INVENTION_TYPE.NORMAL, game, { type: "wood", amount: 1 });
    }
    onBuild() {
        super.onBuild();
        this._game.resourceService.pit = true;
    }
    onDestruction() {
        super.onDestruction();
        this._game.resourceService.pit = false;
    }
}
exports.Pit = Pit;
//# sourceMappingURL=Pit.js.map