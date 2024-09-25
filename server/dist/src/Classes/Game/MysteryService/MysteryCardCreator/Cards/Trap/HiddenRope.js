"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiddenRope = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class HiddenRope extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.HIDDEN_ROPE);
    }
    triggerDrawEffect(drawer) {
        this._game.constructionService.lvlDownIfPossible(Construction_1.CONSTRUCTION.WEAPON, 2, this._name);
    }
}
exports.HiddenRope = HiddenRope;
//# sourceMappingURL=HiddenRope.js.map