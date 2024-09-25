"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheHunt = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("../../../../../../shared/types/Game/Skill/ABILITY");
class TheHunt extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.THE_HUNT, "all", null, 4, game, character);
    }
    use() {
        super.use(null);
        this._game.beastService.moveBeastFromStackToDeck();
    }
}
exports.TheHunt = TheHunt;
//# sourceMappingURL=TheHunt.js.map