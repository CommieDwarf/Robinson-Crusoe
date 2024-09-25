"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = void 0;
const Invention_1 = require("../../../../../../shared/types/Game/InventionService/Invention");
const ITile_1 = require("../../../../../../shared/types/Game/TileService/ITile");
const Pawn_1 = require("../../../../../../shared/types/Game/Pawns/Pawn");
const Invention_2 = require("../../Invention");
class Map extends Invention_2.Invention {
    constructor(game) {
        super(Invention_1.INVENTION_STARTER.MAP, { terrainType: ITile_1.TERRAIN_TYPE.RIVER, inventions: null }, Invention_1.INVENTION_TYPE.STARTER, game);
    }
    onBuild() {
        super.onBuild();
        this._pawnService.initPawns(1, false, Pawn_1.PAWN_HELPER_ACTION.EXPLORE);
    }
    onDestruction() {
        super.onDestruction();
        this._pawnService.destroyAllPawns();
    }
}
exports.Map = Map;
//# sourceMappingURL=Map.js.map