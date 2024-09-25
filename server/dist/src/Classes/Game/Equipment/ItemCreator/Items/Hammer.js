"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hammer = void 0;
const Item_1 = require("../Item");
const Item_2 = require("@shared/types/Game/Equipment/Item");
const Pawn_1 = require("@shared/types/Game/Pawns/Pawn");
class Hammer extends Item_1.Item {
    constructor(game) {
        super(Item_2.ITEM.HAMMER, game);
    }
    use(character, target = character) {
        super.use(character, target);
        character.pawnService.addPawn(true, Pawn_1.PAWN_HELPER_ACTION.BUILD);
    }
}
exports.Hammer = Hammer;
//# sourceMappingURL=Hammer.js.map