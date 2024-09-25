"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrapMysteryCard = void 0;
const MysteryCard_1 = require("../../../../../../../shared/types/Game/MysteryService/MysteryCard");
const MysteryCard_2 = require("../../MysteryCard");
class TrapMysteryCard extends MysteryCard_2.MysteryCard {
    constructor(game, name, eventLabel = "", drawLabel = "") {
        super(game, name, false, "", eventLabel, drawLabel);
        this._type = MysteryCard_1.MYSTERY_CARD_TYPE.TRAP;
    }
    get renderData() {
        return super.getRenderData();
    }
}
exports.TrapMysteryCard = TrapMysteryCard;
//# sourceMappingURL=TrapMysteryCard.js.map