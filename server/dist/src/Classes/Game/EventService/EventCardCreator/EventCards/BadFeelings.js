"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadFeelings = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class BadFeelings extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.BAD_FEELINGS, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "złe przeczucia";
        this._resolutionPL = "ostrożne zbieranie";
    }
    triggerEventEffect() {
        this._game.actionService.setReRollToken(ACTION_1.ACTION.GATHER, true, this._namePL);
    }
    triggerThreatEffect() {
        this._game.actionService.setReRollToken(ACTION_1.ACTION.GATHER, true, this._namePL);
    }
    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 1, this._resolutionPL);
    }
}
exports.BadFeelings = BadFeelings;
//# sourceMappingURL=BadFeelings.js.map