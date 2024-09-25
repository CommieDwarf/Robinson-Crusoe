"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Furnace = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
class Furnace extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.FURNACE, { terrainType: null, inventions: [Invention_2.INVENTION_STARTER.BRICKS] }, Invention_2.INVENTION_TYPE.NORMAL, game);
    }
}
exports.Furnace = Furnace;
//# sourceMappingURL=Furnace.js.map