"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Council = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
class Council extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.COUNCIL, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "narada";
        this._resolutionPL = "burza mózgów";
    }
    triggerEventEffect() {
        //TODO: discard 3 inventions
    }
    triggerThreatEffect() {
        //TODO: discard 2 inventions
    }
    fullFill() {
        this.incrDetermination(1);
        //TODO: get 1 chosen invention
    }
}
exports.Council = Council;
//# sourceMappingURL=Council.js.map