"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BluntSpear = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class BluntSpear extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.BLUNT_SPEAR);
    }
    triggerDrawEffect(drawer) {
        this._game.characterService.hurt(drawer, 2, this._name);
    }
}
exports.BluntSpear = BluntSpear;
//# sourceMappingURL=BluntSpear.js.map