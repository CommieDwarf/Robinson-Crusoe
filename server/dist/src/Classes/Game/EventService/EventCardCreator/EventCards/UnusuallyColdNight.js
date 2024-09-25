"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnusuallyColdNight = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
class UnusuallyColdNight extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.UNUSUALLY_COLD_NIGHT, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "wood",
            optionalResource: null,
        }, game);
        this._namePL = "niezwykle zimna noc";
        this._resolutionPL = "ocieplenie obozowiska";
    }
    triggerEventEffect() {
        this._game.resourceService.spendBasicResourceOrGetHurt("wood", 2, this.name);
    }
    triggerThreatEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this.name);
    }
    fullFill() {
        this._game.characterService.incrDetermination(this.getLeaderCharacter(), 1, this.name);
    }
}
exports.UnusuallyColdNight = UnusuallyColdNight;
//# sourceMappingURL=UnusuallyColdNight.js.map