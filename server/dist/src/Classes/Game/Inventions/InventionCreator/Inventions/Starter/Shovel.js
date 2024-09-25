"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shovel = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const ITile_1 = require("@shared/types/Game/TileService/ITile");
class Shovel extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_STARTER.SHOVEL, { terrainType: ITile_1.TERRAIN_TYPE.BEACH, inventions: null }, Invention_2.INVENTION_TYPE.STARTER, game);
    }
}
exports.Shovel = Shovel;
//# sourceMappingURL=Shovel.js.map