"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurprisingDiscovery = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class SurprisingDiscovery extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SURPRISING_DISCOVERY, "", false, game, "keep", "");
    }
    resolveOption1(resolver) {
        //TODO: keep card with temporary +3 weapon usage.
    }
}
exports.SurprisingDiscovery = SurprisingDiscovery;
//# sourceMappingURL=SurprisingDiscovery.js.map