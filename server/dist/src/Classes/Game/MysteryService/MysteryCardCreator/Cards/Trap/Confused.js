"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Confused = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Confused extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.CONFUSED);
    }
    triggerDrawEffect(drawer) {
        //TODO: implement reroll success on Character.
    }
}
exports.Confused = Confused;
//# sourceMappingURL=Confused.js.map