"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Belts = void 0;
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const Pawn_1 = require("@shared/types/Game/Pawns/Pawn");
const Invention_2 = require("../../Invention");
class Belts extends Invention_2.Invention {
    constructor(game) {
        super(Invention_1.INVENTION_NORMAL.BELTS, { terrainType: null, inventions: [Invention_1.INVENTION_STARTER.KNIFE] }, Invention_1.INVENTION_TYPE.NORMAL, game, { type: "leather", amount: 1 });
    }
    onBuild() {
        super.onBuild();
        this._pawnService.initPawns(1, false, Pawn_1.PAWN_HELPER_ACTION.GATHER);
    }
    onDestruction() {
        super.onDestruction();
        this._pawnService.destroyAllPawns();
    }
}
exports.Belts = Belts;
//# sourceMappingURL=Belts.js.map