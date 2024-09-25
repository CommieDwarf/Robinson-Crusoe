"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharpBlade = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class SharpBlade extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.SHARP_BLADE, "ostrze");
    }
    triggerDrawEffect(drawer) {
        this._game.characterService.hurt(drawer, 2, this._name);
    }
}
exports.SharpBlade = SharpBlade;
//# sourceMappingURL=SharpBlade.js.map