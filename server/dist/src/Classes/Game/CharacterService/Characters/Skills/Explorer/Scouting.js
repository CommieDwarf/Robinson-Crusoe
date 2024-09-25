"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scouting = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("../../../../../../shared/types/Game/Skill/ABILITY");
class Scouting extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.SCOUTING, "all", null, 2, game, character);
    }
    use(target) {
        super.use(target);
        const tokenService = this._game.tokenService;
        const [token1, token2] = [
            tokenService.getRandomTokenFromStack(),
            tokenService.getRandomTokenFromStack(),
        ];
        this._game.startPickingObject([token1, token2], this._character, 1, this._name, "token", (token) => {
            const discarded = token === token1 ? token2 : token1;
            tokenService.addTokenToOwned(token);
            tokenService.shuffleInToStack(discarded.name);
        });
    }
}
exports.Scouting = Scouting;
//# sourceMappingURL=Scouting.js.map