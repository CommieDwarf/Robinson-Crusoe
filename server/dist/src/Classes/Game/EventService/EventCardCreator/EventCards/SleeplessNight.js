"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleeplessNight = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class SleeplessNight extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.SLEEPLESS_NIGHT, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "bezsenna noc";
        this._resolutionPL = "odpoczynek";
    }
    triggerEventEffect() {
        this._game.actionService.setReRollToken(ACTION_1.ACTION.EXPLORE, true, this._namePL);
        this._game.actionService.setReRollToken(ACTION_1.ACTION.GATHER, true, this._namePL);
        this._game.actionService.setReRollToken(ACTION_1.ACTION.BUILD, true, this._namePL);
    }
    triggerThreatEffect() {
        this._game.actionService.setAdventureToken(ACTION_1.ACTION.EXPLORE, true, this._namePL);
        this._game.actionService.setAdventureToken(ACTION_1.ACTION.GATHER, true, this._namePL);
    }
    fullFill() {
        this._game.characterService.incrDetermination(this.getLeaderCharacter(), 1, this.name);
    }
}
exports.SleeplessNight = SleeplessNight;
//# sourceMappingURL=SleeplessNight.js.map