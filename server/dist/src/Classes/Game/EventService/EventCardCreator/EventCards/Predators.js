"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predators = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const ACTION_1 = require("@shared/types/Game/ACTION");
class Predators extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.PREDATORS, ACTION_1.ACTION.EXPLORE, {
            pawns: 2,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 2,
            },
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "drapieżniki";
        this._resolutionPL = "walka z drapieżnikami";
    }
    triggerEventEffect() {
        //TODO: deplete closest food source or all Players get hurt.
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        this.incrDetermination(1);
        //TODO: reverse resource depletion.
    }
}
exports.Predators = Predators;
//# sourceMappingURL=Predators.js.map