"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jaguar = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const ACTION_1 = require("@shared/types/Game/ACTION");
class Jaguar extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.JAGUAR, ACTION_1.ACTION.BUILD, {
            pawns: 1,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 2,
            },
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "jaguar";
        this._resolutionPL = "warta";
    }
    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        //nothing
    }
}
exports.Jaguar = Jaguar;
//# sourceMappingURL=Jaguar.js.map