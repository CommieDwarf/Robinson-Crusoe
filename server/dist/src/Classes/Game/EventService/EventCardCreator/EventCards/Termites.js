"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Termites = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
class Termites extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.TERMITES, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.FIRE,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "insekty";
        this._resolutionPL = "walka ze szkodnikami";
    }
    triggerEventEffect() {
        this._game.resourceService.spendBasicResourceIfPossible("wood", 1, this._namePL);
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.Termites = Termites;
//# sourceMappingURL=Termites.js.map