"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CulledArea = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Construction_1 = require("../../../../../shared/types/Game/ConstructionService/Construction");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class CulledArea extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.CULLED_AREA, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 2,
            },
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "przetrzebiona okolica";
        this._resolutionPL = "obfite polowanie";
    }
    triggerEventEffect() {
        //TODO: no food from production in this round
    }
    triggerThreatEffect() {
        //nothing
    }
    fullFill() {
        this._game.resourceService.addBasicResourceToFuture("food", 2, this._resolutionPL);
    }
}
exports.CulledArea = CulledArea;
//# sourceMappingURL=CulledArea.js.map