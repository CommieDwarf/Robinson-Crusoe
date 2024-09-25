"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANewIdea = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("../../../../../../shared/types/Game/Skill/ABILITY");
class ANewIdea extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.A_NEW_IDEA, "all", null, 3, game, character);
    }
    use() {
        super.use(null);
        const inventions = this._game.inventionService.pickInventionsFromStack(5);
        this._game.startPickingObject(inventions, this._character, 1, this._name, "invention", (invention) => {
            this._game.inventionService.addInvention(invention);
            this._game.inventionService.shuffleInventionStack();
        });
    }
}
exports.ANewIdea = ANewIdea;
//# sourceMappingURL=ANewIdea.js.map