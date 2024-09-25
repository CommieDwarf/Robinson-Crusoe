"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyOnTheBeach = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
class BodyOnTheBeach extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.BODY_ON_THE_BEACH, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "ciało na plaży";
        this._resolutionPL = "pochówek";
    }
    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._namePL);
    }
    triggerThreatEffect() {
        this._game.moraleService.lvlDown(2, this._namePL);
    }
    fullFill() {
        this._game.characterService.incrDetermination(this.getLeaderCharacter(), 2, this._resolutionPL);
    }
}
exports.BodyOnTheBeach = BodyOnTheBeach;
//# sourceMappingURL=BodyOnTheBeach.js.map