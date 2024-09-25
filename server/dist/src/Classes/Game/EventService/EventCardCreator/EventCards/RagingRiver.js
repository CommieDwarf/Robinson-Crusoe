"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RagingRiver = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const ACTION_1 = require("@shared/types/Game/ACTION");
class RagingRiver extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.RAGING_RIVER, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "rozszalała rzeka";
        this._resolutionPL = "budowa fosy";
    }
    triggerEventEffect() {
        //TODO: this round in production Phase get Math.floor(1/2) of resources.
    }
    triggerThreatEffect() {
        //TODO: no resources in production Phase.
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.RagingRiver = RagingRiver;
//# sourceMappingURL=RagingRiver.js.map