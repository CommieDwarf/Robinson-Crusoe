"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrangeDisease = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class StrangeDisease extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.STRANGE_DISEASE);
    }
    triggerDrawEffect(drawer) {
        //TODO: implement
    }
}
exports.StrangeDisease = StrangeDisease;
//# sourceMappingURL=StrangeDisease.js.map