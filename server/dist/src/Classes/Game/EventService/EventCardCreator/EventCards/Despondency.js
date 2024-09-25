"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Despondency = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
class Despondency extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.DESPONDENCY, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "food",
            optionalResource: null,
        }, game);
        this._namePL = "brak wiary";
        this._resolutionPL = "mobilizacja";
    }
    triggerEventEffect() {
        //TODO: next player becomes prime.
    }
    triggerThreatEffect() {
        this._game.moraleService.lvlDown(2, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.Despondency = Despondency;
//# sourceMappingURL=Despondency.js.map