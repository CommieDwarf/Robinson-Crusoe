"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaturalDamBreaks = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
class NaturalDamBreaks extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.NATURAL_DAM_BREAKS, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "pęka naturalna tama";
        this._resolutionPL = "zabezpieczenie";
    }
    triggerEventEffect() {
        //TODO: +1 wood but no food in production Phase.
        //TODO: put explore question mark.
    }
    triggerThreatEffect() {
        //TODO: if possible flip 2 invention cards.
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.NaturalDamBreaks = NaturalDamBreaks;
//# sourceMappingURL=NaturalDamBreaks.js.map