"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreasureMap = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class TreasureMap extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.TREASURE_MAP, false, "", 1);
    }
    use() {
        //todo: implement
    }
}
exports.TreasureMap = TreasureMap;
//# sourceMappingURL=TreasureMap.js.map