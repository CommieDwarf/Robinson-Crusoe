"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColdRain = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class ColdRain extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.COLD_RAIN, ACTION_1.ACTION.EXPLORE, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "przenikliwie zimny deszcz";
        this._resolutionPL = "irygacja";
    }
    triggerEventEffect() {
        this._game.weatherService.setToken("rain", true, this._namePL);
    }
    triggerThreatEffect() {
        this._game.weatherService.setToken("rain", true, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.ColdRain = ColdRain;
//# sourceMappingURL=ColdRain.js.map