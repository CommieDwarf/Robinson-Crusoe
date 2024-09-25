"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlowGun = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class BlowGun extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.BLOW_GUN);
    }
    triggerDrawEffect(drawer) {
        //TODO: implement 1 pawn off action.
    }
}
exports.BlowGun = BlowGun;
//# sourceMappingURL=BlowGun.js.map