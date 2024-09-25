"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dam = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const ITile_1 = require("@shared/types/Game/TileService/ITile");
class Dam extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_STARTER.DAM, { terrainType: ITile_1.TERRAIN_TYPE.RIVER, inventions: null }, Invention_2.INVENTION_TYPE.STARTER, game, { type: "wood", amount: 1 });
    }
    onBuild() {
        super.onBuild();
        this._game.resourceService.addBasicResourceToFuture("dryFood", 2, this._logSource);
    }
    onDestruction() {
        super.onDestruction();
        this._game.resourceService.spendBasicResourceIfPossible("dryFood", 2, this._logSource);
    }
}
exports.Dam = Dam;
//# sourceMappingURL=Dam.js.map