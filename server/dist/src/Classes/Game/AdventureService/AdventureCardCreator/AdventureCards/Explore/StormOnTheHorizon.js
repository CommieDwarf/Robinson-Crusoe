"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormOnTheHorizon = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class StormOnTheHorizon extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON, "storm", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.weatherService.setToken("storm", true, this._eventName);
    }
}
exports.StormOnTheHorizon = StormOnTheHorizon;
//# sourceMappingURL=StormOnTheHorizon.js.map