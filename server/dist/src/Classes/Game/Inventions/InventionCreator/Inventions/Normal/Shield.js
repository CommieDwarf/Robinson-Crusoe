"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shield = void 0;
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const Invention_2 = require("../../Invention");
const Pawn_1 = require("@shared/types/Game/Pawns/Pawn");
class Shield extends Invention_2.Invention {
    constructor(game) {
        super(Invention_1.INVENTION_NORMAL.SHIELD, { terrainType: null, inventions: [Invention_1.INVENTION_STARTER.ROPE] }, Invention_1.INVENTION_TYPE.NORMAL, game, { type: "wood", amount: 1 });
    }
    onBuild() {
        super.onBuild();
        this._pawnService.initPawns(1, false, Pawn_1.PAWN_HELPER_ACTION.HUNT);
    }
    onDestruction() {
        super.onDestruction();
        this._pawnService.destroyAllPawns();
    }
}
exports.Shield = Shield;
//# sourceMappingURL=Shield.js.map