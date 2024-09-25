"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otters = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Construction_1 = require("../../../../../shared/types/Game/ConstructionService/Construction");
class Otters extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.OTTERS, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 1,
            },
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "wydry";
        this._resolutionPL = "udane polowanie";
    }
    triggerEventEffect() {
        //TODO: dasdas
    }
    triggerThreatEffect() {
    }
    fullFill() {
        //TODO: reverse resources's depletion
    }
}
exports.Otters = Otters;
//# sourceMappingURL=Otters.js.map