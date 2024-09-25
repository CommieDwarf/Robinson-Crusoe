"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LossOfHope = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
class LossOfHope extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.LOSS_OF_HOPE, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "utrata nadziei";
        this._resolutionPL = "odpoczynek";
    }
    triggerEventEffect() {
        //TODO: In this round prime player can use only rest, arrange camp and build
    }
    triggerThreatEffect() {
        this._game.moraleService.lvlDown(2, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.LossOfHope = LossOfHope;
//# sourceMappingURL=LossOfHope.js.map