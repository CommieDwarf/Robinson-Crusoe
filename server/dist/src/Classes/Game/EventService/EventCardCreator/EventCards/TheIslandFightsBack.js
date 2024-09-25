"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheIslandFightsBack = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
class TheIslandFightsBack extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.THE_ISLAND_FIGHTS_BACK, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "wyspa się buntuje";
        this._resolutionPL = "ratunek";
    }
    triggerEventEffect() {
        //TODO: book effect..
    }
    triggerThreatEffect() {
        //TODO: book effect...
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.TheIslandFightsBack = TheIslandFightsBack;
//# sourceMappingURL=TheIslandFightsBack.js.map