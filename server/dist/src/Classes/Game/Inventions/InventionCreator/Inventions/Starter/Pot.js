"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pot = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("@shared/types/Game/InventionService/Invention");
const ITile_1 = require("@shared/types/Game/TileService/ITile");
class Pot extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_STARTER.POT, { terrainType: ITile_1.TERRAIN_TYPE.HILLS, inventions: null }, Invention_2.INVENTION_TYPE.STARTER, game);
        this._usable = true;
    }
    use(user) {
        if (this._game.phaseService.phase === "night") {
            if (this._game.resourceService.canAffordResource("food", 1)) {
                this._game.resourceService.spendBasicResourceIfPossible("food", 1, "");
                this._game.characterService.heal(user, 1, this._namePL);
            }
        }
    }
}
exports.Pot = Pot;
//# sourceMappingURL=Pot.js.map