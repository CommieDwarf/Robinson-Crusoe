"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collapse = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class Collapse extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.COLLAPSE);
    }
    triggerDrawEffect(drawer) {
        this._game.mysteryService.disableFurtherCardDraw();
    }
}
exports.Collapse = Collapse;
//# sourceMappingURL=Collapse.js.map