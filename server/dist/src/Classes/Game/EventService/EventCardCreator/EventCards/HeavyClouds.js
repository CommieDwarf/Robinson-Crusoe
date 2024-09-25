"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeavyClouds = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class HeavyClouds extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.HEAVY_CLOUDS, ACTION_1.ACTION.BUILD, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "leather",
            optionalResource: null,
        }, game);
        this._namePL = "deszczowe chmury";
        this._resolutionPL = "wzmocnienie dachu";
    }
    triggerEventEffect() {
        this._game.weatherService.setToken("rain", true, this._namePL);
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.HeavyClouds = HeavyClouds;
//# sourceMappingURL=HeavyClouds.js.map