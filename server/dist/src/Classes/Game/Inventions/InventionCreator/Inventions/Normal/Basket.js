"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basket = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const ITile_1 = require("@shared/types/Game/TileService/ITile");
class Basket extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.BASKET, { terrainType: ITile_1.TERRAIN_TYPE.PLAINS, inventions: null }, Invention_2.INVENTION_TYPE.NORMAL, game);
    }
}
exports.Basket = Basket;
//# sourceMappingURL=Basket.js.map