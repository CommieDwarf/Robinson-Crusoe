"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndOfSource = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class EndOfSource extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.END_OF_SOURCE, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        var _a;
        (_a = this.getTile().tileResourceService) === null || _a === void 0 ? void 0 : _a.deplete(this.getSide(), this._name);
    }
}
exports.EndOfSource = EndOfSource;
//# sourceMappingURL=EndOfSource.js.map