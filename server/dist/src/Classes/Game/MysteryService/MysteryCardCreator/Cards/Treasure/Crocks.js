"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crocks = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const Invention_1 = require("../../../../../../shared/types/Game/InventionService/Invention");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class Crocks extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CROCKS, false, "", 0);
    }
    triggerDrawEffect(drawer) {
        if (!this._game.inventionService.isBuilt(Invention_1.INVENTION_STARTER.POT)) {
            this._game.inventionService.build(Invention_1.INVENTION_STARTER.POT, drawer);
        }
    }
}
exports.Crocks = Crocks;
//# sourceMappingURL=Crocks.js.map