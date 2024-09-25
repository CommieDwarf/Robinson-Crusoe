"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NightHowling = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const Construction_1 = require("../../../../../shared/types/Game/ConstructionService/Construction");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
class NightHowling extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.NIGHT_HOWLING, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 2,
            },
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "nocne wycie z dżungli";
        this._resolutionPL = "ochrona przed bestiami";
    }
    triggerEventEffect() {
        this._game.beastService;
    }
    triggerThreatEffect() {
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.PALISADE, 1, this.name);
    }
    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 1, this.name);
    }
}
exports.NightHowling = NightHowling;
//# sourceMappingURL=NightHowling.js.map