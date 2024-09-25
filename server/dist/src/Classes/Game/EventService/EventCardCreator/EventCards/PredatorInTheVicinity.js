"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredatorInTheVicinity = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Construction_1 = require("../../../../../shared/types/Game/ConstructionService/Construction");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class PredatorInTheVicinity extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.PREDATOR_IN_THE_VICINITY, ACTION_1.ACTION.EXPLORE, {
            pawns: 1,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 2,
            },
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "drapieżniki w okolicy";
        this._resolutionPL = "przepędzenie drapieżnika";
    }
    triggerEventEffect() {
        //TODO: set animal dice at weather
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.PredatorInTheVicinity = PredatorInTheVicinity;
//# sourceMappingURL=PredatorInTheVicinity.js.map