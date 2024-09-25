"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherBreakdown = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class WeatherBreakdown extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.WEATHER_BREAKDOWN, "storm", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.weatherService.setToken("storm", true, this._eventName);
    }
}
exports.WeatherBreakdown = WeatherBreakdown;
//# sourceMappingURL=WeatherBreakdown.js.map