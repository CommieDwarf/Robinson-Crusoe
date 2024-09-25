"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weakness = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
class Weakness extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.WEAKNESS, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "osłabienie";
        this._resolutionPL = "odpoczynek";
    }
    triggerEventEffect() {
        //TODO: prime player cant use abilities
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.Weakness = Weakness;
//# sourceMappingURL=Weakness.js.map