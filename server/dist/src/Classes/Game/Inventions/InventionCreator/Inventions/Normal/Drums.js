"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drums = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
const ITile_1 = require("../../../../../../shared/types/Game/TileService/ITile");
class Drums extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.DRUMS, { terrainType: ITile_1.TERRAIN_TYPE.HILLS, inventions: null }, Invention_2.INVENTION_TYPE.NORMAL, game, { type: "leather", amount: 1 });
    }
}
exports.Drums = Drums;
//# sourceMappingURL=Drums.js.map