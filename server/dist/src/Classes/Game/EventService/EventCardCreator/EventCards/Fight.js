"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fight = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class Fight extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.FIGHT, ACTION_1.ACTION.BUILD, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "bójka";
        this._resolutionPL = "przemowa";
    }
    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    }
    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(2, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.Fight = Fight;
//# sourceMappingURL=Fight.js.map