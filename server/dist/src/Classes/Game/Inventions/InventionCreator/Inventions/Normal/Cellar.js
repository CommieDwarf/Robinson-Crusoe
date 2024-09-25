"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cellar = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
class Cellar extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.CELLAR, { terrainType: null, inventions: [Invention_2.INVENTION_STARTER.SHOVEL] }, Invention_2.INVENTION_TYPE.NORMAL, game);
    }
}
exports.Cellar = Cellar;
//# sourceMappingURL=Cellar.js.map