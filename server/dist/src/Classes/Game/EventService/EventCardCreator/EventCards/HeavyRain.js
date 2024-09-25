"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeavyRain = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class HeavyRain extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.HEAVY_RAIN, ACTION_1.ACTION.BUILD, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "wood",
            optionalResource: null,
        }, game);
        this._namePL = "ulewa";
        this._resolutionPL = "przygotowanie do ulewy";
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
exports.HeavyRain = HeavyRain;
//# sourceMappingURL=HeavyRain.js.map