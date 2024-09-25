"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongTrack = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class WrongTrack extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.WRONG_TRACK, "pomylone ścieżki", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        //TODO: night out of camp
    }
    triggerEventEffect() {
        this._game.resourceService.addBasicResourceToOwned("wood", 2, this._eventName);
    }
}
exports.WrongTrack = WrongTrack;
//# sourceMappingURL=WrongTrack.js.map