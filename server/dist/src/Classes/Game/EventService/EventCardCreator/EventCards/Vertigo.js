"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertigo = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
class Vertigo extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.VERTIGO, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "zawroty głowy";
        this._resolutionPL = "odpoczynek";
    }
    triggerEventEffect() {
        //TODO: prime player can use only 1 pawn
    }
    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(1, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.Vertigo = Vertigo;
//# sourceMappingURL=Vertigo.js.map