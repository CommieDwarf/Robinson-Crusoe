"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortage = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class Shortage extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SHORTAGE, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        const tile = this.getTile();
        const side = this.getSide();
        this._game.tileService.gather([side], tile.id, this._name);
        tile.depleteResource(side, this._name);
    }
}
exports.Shortage = Shortage;
//# sourceMappingURL=Shortage.js.map