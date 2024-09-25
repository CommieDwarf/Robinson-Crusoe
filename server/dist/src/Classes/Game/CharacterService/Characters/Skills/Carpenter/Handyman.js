"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handyman = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("@shared/types/Game/Skill/ABILITY");
const Pawn_1 = require("@shared/types/Game/Pawns/Pawn");
class Handyman extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.HANDYMAN, "all", null, 3, game, character);
    }
    use() {
        super.use(null);
        this._character.pawnService.addPawn(true, Pawn_1.PAWN_HELPER_ACTION.BUILD);
    }
}
exports.Handyman = Handyman;
//# sourceMappingURL=Handyman.js.map