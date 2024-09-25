"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FightInTheDark = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Construction_1 = require("../../../../../shared/types/Game/ConstructionService/Construction");
class FightInTheDark extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.FIGHT_IN_THE_DARK, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 2,
            },
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "walka w ciemnościach";
        this._resolutionPL = "tropienie drapieżnika";
    }
    triggerEventEffect() {
        if (this._game.beastService.deckCount > 0) {
            this._game.beastService.removeBeastFromDeck();
        }
    }
    triggerThreatEffect() {
        //TODO: set hungry animals dice to weather.
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.FightInTheDark = FightInTheDark;
//# sourceMappingURL=FightInTheDark.js.map