"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catastrophe = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class Catastrophe extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.BEAR, ACTION_1.ACTION.BUILD, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "kataklizm";
        this._resolutionPL = "naprawa narzędzi";
    }
    triggerEventEffect() {
        //TODO: lock equipment items from usage.
        //TODO: unlock after action Phase.
    }
    triggerThreatEffect() {
        //TODO: discard 1 equipment item and cancel it's effect if possible
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.Catastrophe = Catastrophe;
//# sourceMappingURL=Catastrophe.js.map