"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExhaustingNight = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class ExhaustingNight extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.EXHAUSTING_NIGHT, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "wyczerpująca noc";
        this._resolutionPL = "odpoczynek";
    }
    triggerEventEffect() {
        this._game.actionService.setReRollToken(ACTION_1.ACTION.BUILD, true, this._namePL);
    }
    triggerThreatEffect() {
        this._game.moraleService.lvlDown(2, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.ExhaustingNight = ExhaustingNight;
//# sourceMappingURL=ExhaustingNight.js.map