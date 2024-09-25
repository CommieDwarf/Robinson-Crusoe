"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlowWork = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class SlowWork extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.SLOW_WORK, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "znojna praca";
        this._resolutionPL = "odpoczynek";
    }
    triggerEventEffect() {
        this._game.actionService.addGlobalCostModifier(ACTION_1.ACTION.BUILD, "wood", true, this._namePL);
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.SlowWork = SlowWork;
//# sourceMappingURL=SlowWork.js.map