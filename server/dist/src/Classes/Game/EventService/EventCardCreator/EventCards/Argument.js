"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argument = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
class Argument extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.ARGUMENT, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 2,
            invention: null,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "kłótnia";
        this._resolutionPL = "pogodzenie się";
    }
    triggerEventEffect() {
        this._game.eventService.setSpecialEffect("argument", true, this.name);
    }
    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(1, this.name);
        this._game.moraleService.lvlDown(1, this.name);
    }
    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.moraleService.lvlUp(1, this.name);
        this._game.characterService.incrDetermination(leader, 1, this.name);
    }
}
exports.Argument = Argument;
//# sourceMappingURL=Argument.js.map