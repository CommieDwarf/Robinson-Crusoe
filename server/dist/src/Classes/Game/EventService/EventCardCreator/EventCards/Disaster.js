"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disaster = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class Disaster extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.DISASTER, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "wood",
            optionalResource: null,
        }, game);
        this._namePL = "katastrofa";
        this._resolutionPL = "łata";
    }
    triggerEventEffect() {
        //TODO: choose -1 roof or -1 palisade
    }
    triggerThreatEffect() {
        //TODO -1/2 roof or palisade
    }
    fullFill() {
        //TODO choose +1 roof or palisade (if shelter is built)
    }
}
exports.Disaster = Disaster;
//# sourceMappingURL=Disaster.js.map