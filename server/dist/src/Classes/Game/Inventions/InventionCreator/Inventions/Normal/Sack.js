"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sack = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
class Sack extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_NORMAL.SACK, { terrainType: null, inventions: null }, Invention_2.INVENTION_TYPE.NORMAL, game, { type: "leather", amount: 1 });
    }
}
exports.Sack = Sack;
//# sourceMappingURL=Sack.js.map