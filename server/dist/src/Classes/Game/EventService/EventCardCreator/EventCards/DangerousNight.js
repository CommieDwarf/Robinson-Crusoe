"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DangerousNight = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
class DangerousNight extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.DANGEROUS_NIGHT, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 2,
            },
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "niebezpieczna noc";
        this._resolutionPL = "budowa zabezpieczeń";
    }
    triggerEventEffect() {
        // TODO: implement adding beast to event cards.
        this._game.eventService.addCardToTopOfStack(undefined);
    }
    triggerThreatEffect() {
        // nothing happens.
    }
    fullFill() {
        // TODO: shuffle beast in to the event cards.
    }
}
exports.DangerousNight = DangerousNight;
//# sourceMappingURL=DangerousNight.js.map