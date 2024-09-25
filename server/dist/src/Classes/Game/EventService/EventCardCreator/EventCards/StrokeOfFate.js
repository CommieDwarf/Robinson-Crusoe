"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrokeOfFate = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class StrokeOfFate extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.STROKE_OF_FATE, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "zły los";
        this._resolutionPL = "pokrzepiający odpoczynek";
    }
    triggerEventEffect() {
        if (this._game.eventService.left) {
            this._game.eventService.left.triggerThreatEffect();
            this._game.eventService.left = null;
        }
        if (this._game.eventService.right) {
            this._game.eventService.right.triggerThreatEffect();
            this._game.eventService.right = null;
        }
    }
    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(1, this._namePL);
    }
    fullFill() {
        this.incrDetermination(3);
    }
}
exports.StrokeOfFate = StrokeOfFate;
//# sourceMappingURL=StrokeOfFate.js.map