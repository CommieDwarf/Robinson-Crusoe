"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaveWithFurs = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class CaveWithFurs extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CAVE_WITH_FURS, false, "", 1);
    }
    triggerDrawEffect(drawer) {
        this._game.resourceService.addBasicResourceToFuture("leather", 2, this._name);
    }
}
exports.CaveWithFurs = CaveWithFurs;
//# sourceMappingURL=CaveWithFurs.js.map