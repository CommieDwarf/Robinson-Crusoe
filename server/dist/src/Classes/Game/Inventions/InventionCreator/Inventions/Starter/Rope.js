"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rope = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
const ITile_1 = require("../../../../../../shared/types/Game/TileService/ITile");
class Rope extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_STARTER.ROPE, { terrainType: ITile_1.TERRAIN_TYPE.PLAINS, inventions: null }, Invention_2.INVENTION_TYPE.STARTER, game);
    }
}
exports.Rope = Rope;
//# sourceMappingURL=Rope.js.map