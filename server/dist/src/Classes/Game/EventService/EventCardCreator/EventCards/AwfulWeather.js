"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwfulWeather = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class AwfulWeather extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.AWFUL_WEATHER, ACTION_1.ACTION.EXPLORE, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "wood",
            optionalResource: null,
        }, game);
        this._namePL = "okropna pogoda";
        this._resolutionPL = "wiatrochron";
    }
    triggerEventEffect() {
        this._game.weatherService.setToken("rain", true, this._namePL);
    }
    triggerThreatEffect() {
        this._game.weatherService.setToken("snow", true, this._namePL);
    }
    fullFill() {
        const character = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(character, 1, `${this.name} (${character.name})`);
    }
}
exports.AwfulWeather = AwfulWeather;
//# sourceMappingURL=AwfulWeather.js.map