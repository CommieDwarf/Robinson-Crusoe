"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Landslide = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class Landslide extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.LANDSLIDE, ACTION_1.ACTION.BUILD, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "osuwisko";
        this._resolutionPL = "zabezpieczenie obozowiska";
    }
    triggerEventEffect() {
        //TODO: move camp, check guide
    }
    triggerThreatEffect() {
        //TODO: no resources in production Phase.
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.Landslide = Landslide;
//# sourceMappingURL=Landslide.js.map