"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Net = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Net extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.NET, "sieć");
    }
    triggerDrawEffect(drawer) {
        //TODO: implement stop drawing cards.
        //TODO: implement night outside the camp
    }
}
exports.Net = Net;
//# sourceMappingURL=Net.js.map