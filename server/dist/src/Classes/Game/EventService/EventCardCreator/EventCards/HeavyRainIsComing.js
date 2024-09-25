"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeavyRainIsComing = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const ACTION_1 = require("@shared/types/Game/ACTION");
class HeavyRainIsComing extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.HEAVY_RAIN_IS_COMING, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "nadchodzi ulewa";
        this._resolutionPL = "irygacja";
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
exports.HeavyRainIsComing = HeavyRainIsComing;
//# sourceMappingURL=HeavyRainIsComing.js.map