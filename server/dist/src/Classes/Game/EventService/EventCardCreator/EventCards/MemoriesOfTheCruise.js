"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoriesOfTheCruise = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class MemoriesOfTheCruise extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.MEMORIES_OF_THE_CRUISE, ACTION_1.ACTION.BUILD, {
            pawns: 2,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "wspomnienia z rejsu";
        this._resolutionPL = "szanty";
    }
    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._namePL);
    }
    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(1, this._namePL);
    }
    fullFill() {
        this.incrDetermination(2);
        this._game.moraleService.lvlUp(1, this._resolutionPL);
    }
}
exports.MemoriesOfTheCruise = MemoriesOfTheCruise;
//# sourceMappingURL=MemoriesOfTheCruise.js.map