"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Raft = void 0;
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const Invention_2 = require("../../Invention");
const Pawn_1 = require("@shared/types/Game/Pawns/Pawn");
class Raft extends Invention_2.Invention {
    constructor(game) {
        super(Invention_1.INVENTION_NORMAL.RAFT, { terrainType: null, inventions: [Invention_1.INVENTION_STARTER.ROPE] }, Invention_1.INVENTION_TYPE.NORMAL, game, { type: "wood", amount: 2 });
    }
    onBuild() {
        super.onBuild();
        this._pawnService.initPawns(1, false, Pawn_1.PAWN_HELPER_ACTION.GATHER_EXPLORE);
    }
    onDestruction() {
        super.onDestruction();
        this._pawnService.pawns.forEach((pawn) => this._pawnService.destroyPawn(pawn.draggableId));
    }
}
exports.Raft = Raft;
//# sourceMappingURL=Raft.js.map