"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Depression = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
class Depression extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.DEPRESSION, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "food",
            optionalResource: null,
        }, game);
        this._namePL = "depresja";
        this._resolutionPL = "pocieszenie";
    }
    triggerEventEffect() {
        //TODO: discard 2 inventions.
        this._game.characterService.decrDeterminationAllPlayerCharacters(1, this._namePL);
    }
    triggerThreatEffect() {
        this._game.moraleService.lvlDown(1, this._namePL);
        //TODO: discard 2 inventions.
    }
    fullFill() {
        this.incrDetermination(2);
    }
}
exports.Depression = Depression;
//# sourceMappingURL=Depression.js.map