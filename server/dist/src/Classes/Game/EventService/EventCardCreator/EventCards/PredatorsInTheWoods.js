"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredatorsInTheWoods = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Construction_1 = require("../../../../../shared/types/Game/ConstructionService/Construction");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class PredatorsInTheWoods extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.PREDATORS_IN_THE_WOODS, ACTION_1.ACTION.EXPLORE, {
            pawns: 1,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 1,
            },
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "drapieżniki w pobliżu";
        this._resolutionPL = "poszukiwania drapieżnika";
    }
    triggerEventEffect() {
        //TODO: put beast token on explore action.
    }
    triggerThreatEffect() {
        //TODO: discard beast token.
        this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    }
    fullFill() {
        //TODO: discard beast token.
        this.incrDetermination(1);
    }
}
exports.PredatorsInTheWoods = PredatorsInTheWoods;
//# sourceMappingURL=PredatorsInTheWoods.js.map