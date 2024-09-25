"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frost = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class Frost extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.FROST, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "leather",
            optionalResource: null,
        }, game);
        this._namePL = "frost";
        this._resolutionPL = "ogrzanie obozu";
    }
    triggerEventEffect() {
        this._game.weatherService.setToken("snow", true, this._namePL);
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        this.incrDetermination(2);
    }
}
exports.Frost = Frost;
//# sourceMappingURL=Frost.js.map