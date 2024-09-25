"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColdWind = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class ColdWind extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.COLD_WIND, "snow", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.weatherService.setToken("snow", true, this._eventName);
    }
}
exports.ColdWind = ColdWind;
//# sourceMappingURL=ColdWind.js.map