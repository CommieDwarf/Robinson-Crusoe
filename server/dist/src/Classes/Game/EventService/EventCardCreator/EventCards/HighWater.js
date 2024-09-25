"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighWater = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const ACTION_1 = require("@shared/types/Game/ACTION");
class HighWater extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.HIGH_WATER, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: "wood",
            optionalResource: null,
        }, game);
        this._namePL = "rwąca rzeka";
        this._resolutionPL = "odpływ";
    }
    //TODO: implement if shovel is built, no wood required.
    triggerEventEffect() {
        //TODO: set exploration question mark.
    }
    triggerThreatEffect() {
        //TODO: check rules in the guide.
    }
    fullFill() {
        this.incrDetermination(2);
    }
}
exports.HighWater = HighWater;
//# sourceMappingURL=HighWater.js.map