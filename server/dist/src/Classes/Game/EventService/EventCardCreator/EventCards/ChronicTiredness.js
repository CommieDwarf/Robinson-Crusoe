"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChronicTiredness = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class ChronicTiredness extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.CHRONIC_TIREDNESS, ACTION_1.ACTION.EXPLORE, {
            pawns: 2,
            invention: null,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "chroniczne zmęczenie";
        this._resolutionPL = "regeneracja";
    }
    triggerEventEffect() {
        //TODO: in this round night Phase increase food consumption by 1.
    }
    triggerThreatEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.ChronicTiredness = ChronicTiredness;
//# sourceMappingURL=ChronicTiredness.js.map