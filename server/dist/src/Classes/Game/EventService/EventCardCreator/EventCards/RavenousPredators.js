"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RavenousPredators = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class RavenousPredators extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.RAVENOUS_PREDATORS, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.FIRE,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "wygłodniałe drapieżniki";
        this._resolutionPL = "przeganianie zwierząt";
    }
    triggerEventEffect() {
        //TODO: set beast strength +1.
    }
    triggerThreatEffect() {
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.PALISADE, 1, this._namePL);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.RavenousPredators = RavenousPredators;
//# sourceMappingURL=RavenousPredators.js.map