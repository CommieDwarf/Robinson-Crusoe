"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reconnaissance = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("@shared/types/Game/Skill/ABILITY");
class Reconnaissance extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.RECONNAISSANCE, "all", null, 2, game, character);
    }
    use() {
        const tileTypes = this._game.tileService.pickTileTypesFromStack(3);
        this._game.startPickingObject(tileTypes, this._character, 1, this._name, "tileType", (tileType) => {
            this._game.tileService.switchOrderInTileStack(tileType, "top");
        });
        super.use(null);
    }
}
exports.Reconnaissance = Reconnaissance;
//# sourceMappingURL=Reconnaissance.js.map