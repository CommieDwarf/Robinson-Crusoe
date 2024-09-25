"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoneSoup = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("../../../../../../shared/types/Game/Skill/ABILITY");
class StoneSoup extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.STONE_SOUP, "all", null, 3, game, character);
    }
    use() {
        if (this._game.phaseService.phase === "action") {
            this._game.resourceService.addBasicResourceToFuture("food", 1, this._name);
        }
        else {
            this._game.resourceService.addBasicResourceToOwned("food", 1, this._name);
        }
        super.use(null);
    }
}
exports.StoneSoup = StoneSoup;
//# sourceMappingURL=StoneSoup.js.map