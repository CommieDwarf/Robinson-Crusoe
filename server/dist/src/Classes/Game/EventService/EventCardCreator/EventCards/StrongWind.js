"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrongWind = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
class StrongWind extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.STRONG_WIND, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "silny wiatr";
        this._resolutionPL = "konserwacja narzędzi";
    }
    triggerEventEffect() {
        //TODO: put +1 required helper in build action
    }
    triggerThreatEffect() {
        //TODO: if possible flip built invention.
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.StrongWind = StrongWind;
//# sourceMappingURL=StrongWind.js.map