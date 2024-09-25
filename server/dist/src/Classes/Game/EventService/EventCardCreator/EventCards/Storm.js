"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storm = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
const Construction_1 = require("../../../../../shared/types/Game/ConstructionService/Construction");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class Storm extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.STORM, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: "wood",
            optionalResource: null,
        }, game);
        this._namePL = "sztorm";
        this._resolutionPL = "wzmocnienie obozowiska";
    }
    triggerEventEffect() {
        this._game.weatherService.setToken("storm", true, this._namePL);
    }
    triggerThreatEffect() {
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.PALISADE, 1, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.Storm = Storm;
//# sourceMappingURL=Storm.js.map