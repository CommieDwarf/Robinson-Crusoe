"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mist = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class Mist extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.MIST, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "mgła";
        this._resolutionPL = "odszukanie dawnego tropu";
    }
    triggerEventEffect() {
        //TODO: put +1 required helper on explore action
        this._game.actionService.addGlobalCostModifier(ACTION_1.ACTION.EXPLORE, "helper", true, this._namePL);
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
        this._game.actionService.setAdventureToken(ACTION_1.ACTION.GATHER, true, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.Mist = Mist;
//# sourceMappingURL=Mist.js.map