"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fire = void 0;
const EventCard_1 = require("../EventCard");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class Fire extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.FIRE, ACTION_1.ACTION.EXPLORE, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "fire";
        this._resolutionPL = "walka z ogniem";
    }
    triggerEventEffect() {
        this._game.resourceService.blockedProductionRound = this._game.round;
    }
    triggerThreatEffect() {
        this._game.resourceService.blockedProductionRound = this._game.round;
    }
    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 2, this.name);
    }
}
exports.Fire = Fire;
//# sourceMappingURL=Fire.js.map