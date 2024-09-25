"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnfortunateAdventure = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class UnfortunateAdventure extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.UNFORTUNATE_ADVENTURE);
    }
    triggerDrawEffect(drawer) {
        //TODO: implement book effect.
    }
}
exports.UnfortunateAdventure = UnfortunateAdventure;
//# sourceMappingURL=UnfortunateAdventure.js.map