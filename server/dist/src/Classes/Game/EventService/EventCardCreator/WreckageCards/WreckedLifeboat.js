"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WreckedLifeboat = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
class WreckedLifeboat extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.WRECKAGE_CARD.WRECKED_LIFEBOAT, EventCard_2.EVENT_TYPE.WRECKAGE, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "resztki szalupy";
        this._resolutionPL = "wyprawa po drewno";
    }
    triggerEventEffect() {
        //nothing
    }
    triggerThreatEffect() {
        //nothing
    }
    fullFill() {
        const helperPawn = this.getHelperPawn();
        if (helperPawn) {
            this._game.resourceService.addBasicResourceToFuture("wood", 2, this.resolutionPL);
        }
        else {
            this._game.resourceService.addBasicResourceToOwned("wood", 1, this.resolutionPL);
        }
    }
}
exports.WreckedLifeboat = WreckedLifeboat;
//# sourceMappingURL=WreckedLifeboat.js.map