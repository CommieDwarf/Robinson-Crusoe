"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectiveAmulet = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class ProtectiveAmulet extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.PROTECTIVE_AMULET, false, "", 1);
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
    use() {
        //todo: implement
    }
}
exports.ProtectiveAmulet = ProtectiveAmulet;
//# sourceMappingURL=ProtectiveAmulet.js.map