"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rain = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class Rain extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.RAIN, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "leather",
            optionalResource: null,
        }, game);
        this._namePL = "deszcz";
        this._resolutionPL = "wzmocniony dach";
    }
    triggerEventEffect() {
        this._game.weatherService.tokens.rain = true;
    }
    triggerThreatEffect() {
        this._game.weatherService.tokens.rain = true;
    }
    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 1, this.name);
    }
}
exports.Rain = Rain;
//# sourceMappingURL=Rain.js.map