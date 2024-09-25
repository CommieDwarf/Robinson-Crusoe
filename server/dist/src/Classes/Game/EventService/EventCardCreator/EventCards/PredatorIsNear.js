"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredatorIsNear = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class PredatorIsNear extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.PREDATOR_IS_NEAR, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 2,
            },
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "drapieżnik w okolicy";
        this._resolutionPL = "walka o pożywienie";
    }
    triggerEventEffect() {
        //TODO: deplete closest food source od all Players get hurt
    }
    triggerThreatEffect() {
        //TODO: put explore and gather question marks.
    }
    fullFill() {
        //TODO: reverse depletion.
        this.incrDetermination(1);
    }
}
exports.PredatorIsNear = PredatorIsNear;
//# sourceMappingURL=PredatorIsNear.js.map