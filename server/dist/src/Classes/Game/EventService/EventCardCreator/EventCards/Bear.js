"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bear = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
class Bear extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.BEAR, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "niedźwiedź";
        this._resolutionPL = "naprawa";
    }
    triggerEventEffect() {
        //TODO: put mark on arrange camp.
        //TODO arrange camp discards mark. No stuff gained.
    }
    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(1, this._namePL);
    }
    fullFill() {
        this._game.characterService.incrDetermination(this.getLeaderCharacter(), 1, this._resolutionPL);
    }
}
exports.Bear = Bear;
//# sourceMappingURL=Bear.js.map