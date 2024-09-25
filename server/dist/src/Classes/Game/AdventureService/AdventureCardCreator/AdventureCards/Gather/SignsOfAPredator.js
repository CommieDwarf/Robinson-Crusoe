"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignsOfAPredator = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class SignsOfAPredator extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SIGNS_OF_A_PREDATOR, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        const tile = this.getTile();
        tile.setTileModifier("greaterDanger", this._name);
    }
}
exports.SignsOfAPredator = SignsOfAPredator;
//# sourceMappingURL=SignsOfAPredator.js.map