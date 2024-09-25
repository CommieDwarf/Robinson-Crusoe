"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RavishingHurricane = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
class RavishingHurricane extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.RAVISHING_HURRICANE, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "spustoszenia po huraganie";
        this._resolutionPL = "odzyskanie źródeł";
    }
    triggerEventEffect() {
        // const tiles = this._game.tileService.tilesAroundCamp;
    }
    triggerThreatEffect() {
        //depletion stays
    }
    fullFill() {
        //TODO: reverse depletion.
        this.incrDetermination(1);
    }
}
exports.RavishingHurricane = RavishingHurricane;
//# sourceMappingURL=RavishingHurricane.js.map