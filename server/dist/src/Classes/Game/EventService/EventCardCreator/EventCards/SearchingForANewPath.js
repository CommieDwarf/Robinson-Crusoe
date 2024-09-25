"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchingForANewPath = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class SearchingForANewPath extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.SEARCHING_FOR_A_NEW_PATH, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "powalone drzewa";
        this._resolutionPL = "poszukiwanie nowej ścieżki";
    }
    triggerEventEffect() {
        //TODO: put reRoll on explore action.
        this._game.actionService.setReRollToken(ACTION_1.ACTION.EXPLORE, true, this._namePL);
    }
    triggerThreatEffect() {
        //TODO: put question marks on explore and gather.
        this._game.actionService.setAdventureToken(ACTION_1.ACTION.EXPLORE, true, this._namePL);
        this._game.actionService.setAdventureToken(ACTION_1.ACTION.GATHER, true, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.SearchingForANewPath = SearchingForANewPath;
//# sourceMappingURL=SearchingForANewPath.js.map