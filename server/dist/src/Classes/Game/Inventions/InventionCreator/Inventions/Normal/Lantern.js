"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lantern = void 0;
const Invention_1 = require("../../../../../../shared/types/Game/InventionService/Invention");
const ITile_1 = require("../../../../../../shared/types/Game/TileService/ITile");
const Invention_2 = require("../../Invention");
class Lantern extends Invention_2.Invention {
    constructor(game) {
        super(Invention_1.INVENTION_NORMAL.LANTERN, { terrainType: ITile_1.TERRAIN_TYPE.HILLS, inventions: [Invention_1.INVENTION_STARTER.FIRE] }, Invention_1.INVENTION_TYPE.NORMAL, game);
    }
    onDestruction() {
        var _a;
        super.onDestruction();
        (_a = this._pawnService) === null || _a === void 0 ? void 0 : _a.pawns.map((pawn) => { var _a; return (_a = this._pawnService) === null || _a === void 0 ? void 0 : _a.destroyPawn(pawn.draggableId); });
    }
}
exports.Lantern = Lantern;
//# sourceMappingURL=Lantern.js.map