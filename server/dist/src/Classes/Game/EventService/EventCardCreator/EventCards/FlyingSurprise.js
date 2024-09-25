"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlyingSurprise = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class FlyingSurprise extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.FLYING_SURPRISE, ACTION_1.ACTION.BUILD, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "wood",
            optionalResource: null,
        }, game);
        this._namePL = "latająca niespodzianka";
        this._resolutionPL = "sprzątanie po wypadku";
    }
    triggerEventEffect() {
        //TODO: choose -1 roof or -1 palisade
    }
    triggerThreatEffect() {
        //TODO: same as triggerEffect
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.FlyingSurprise = FlyingSurprise;
//# sourceMappingURL=FlyingSurprise.js.map