"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thunderstorm = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class Thunderstorm extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.THUNDERSTORM, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "burza z piorunami";
        this._resolutionPL = "odgrodzenie ognia";
    }
    triggerEventEffect() {
        //TODO deplete closest wood else Players get hurt
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        //TODO: reverse depletion
    }
}
exports.Thunderstorm = Thunderstorm;
//# sourceMappingURL=Thunderstorm.js.map