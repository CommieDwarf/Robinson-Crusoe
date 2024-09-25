"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatureMysteryCard = void 0;
const MysteryCard_1 = require("../../../../../../../shared/types/Game/MysteryService/MysteryCard");
const MysteryCard_2 = require("../../MysteryCard");
class CreatureMysteryCard extends MysteryCard_2.MysteryCard {
    constructor(game, name, shuffleable, eventName, eventLabel = "", drawLabel = "") {
        super(game, name, shuffleable, eventName, eventLabel, drawLabel);
        this._type = MysteryCard_1.MYSTERY_CARD_TYPE.CREATURE;
    }
    get renderData() {
        return this.getRenderData();
    }
    getRenderData() {
        return super.getRenderData();
    }
}
exports.CreatureMysteryCard = CreatureMysteryCard;
//# sourceMappingURL=CreatureMysteryCard.js.map