"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessInTheCamp = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class MessInTheCamp extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.MESS_IN_THE_CAMP, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "bałagan w obozie";
        this._resolutionPL = "porządkowanie dobytku";
    }
    triggerEventEffect() {
        this._game.actionService.addGlobalCostModifier(ACTION_1.ACTION.ARRANGE_CAMP, "helper", true, this._namePL);
    }
    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(1, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.MessInTheCamp = MessInTheCamp;
//# sourceMappingURL=MessInTheCamp.js.map