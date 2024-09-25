"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedDiscovery = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class UnexpectedDiscovery extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.UNEXPECTED_DISCOVERY, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        this._game.tokenService.addRandomTokensToOwned(1);
    }
}
exports.UnexpectedDiscovery = UnexpectedDiscovery;
//# sourceMappingURL=UnexpectedDiscovery.js.map