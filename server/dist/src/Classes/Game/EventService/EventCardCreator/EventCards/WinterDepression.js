"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinterDepression = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
class WinterDepression extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.WINTER_DEPRESSION, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "food",
            optionalResource: null,
        }, game);
        this._namePL = "zimowa depresja";
        this._resolutionPL = "rozgrzanie";
    }
    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._name);
    }
    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(1, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.WinterDepression = WinterDepression;
//# sourceMappingURL=WinterDepression.js.map