"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallOfTheWild = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
const Construction_1 = require("../../../../../shared/types/Game/ConstructionService/Construction");
class CallOfTheWild extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.CALL_OF_THE_WILD, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 2,
            },
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "zew natury";
        this._resolutionPL = "zaciekłe polowanie";
    }
    triggerEventEffect() {
        //TODO: put beast token on hunt action.
    }
    triggerThreatEffect() {
        //TODO: same as triggerEffect
    }
    fullFill() {
        this._game.resourceService.addBasicResourceToFuture("food", 1, this._resolutionPL);
    }
}
exports.CallOfTheWild = CallOfTheWild;
//# sourceMappingURL=CallOfTheWild.js.map