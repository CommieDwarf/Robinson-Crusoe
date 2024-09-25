"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flood = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
const Construction_1 = require("../../../../../shared/types/Game/ConstructionService/Construction");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class Flood extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.FLOOD, ACTION_1.ACTION.EXPLORE, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "powódź";
        this._resolutionPL = "budowa odpływu";
    }
    triggerEventEffect() {
        //TODO: choose: flip invention or -1 weapon or -1 palisade or every player gets hurt.
    }
    triggerThreatEffect() {
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.PALISADE, 1, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.Flood = Flood;
//# sourceMappingURL=Flood.js.map