"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormDamage = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class StormDamage extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.STORM_DAMAGE, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "wood",
            optionalResource: null,
        }, game);
        this._namePL = "niszczycielski huragan";
        this._resolutionPL = "reperacja obozowiska";
    }
    triggerEventEffect() {
        //TODO: choose lvl down half roof or palisade.
    }
    triggerThreatEffect() {
        //TODO: choose -1 roof or palisade
    }
    fullFill() {
        //TODO: choose +1 roof or palisade if shelter is built.
    }
}
exports.StormDamage = StormDamage;
//# sourceMappingURL=StormDamage.js.map