"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItWillRain = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class ItWillRain extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.IT_WILL_RAIN, "detached clouds", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.weatherService.setToken("rain", true, this._eventName);
    }
}
exports.ItWillRain = ItWillRain;
//# sourceMappingURL=ItWillRain.js.map