"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poisoning = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class Poisoning extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.POISONING, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.KNIFE,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "trucizna";
        this._resolutionPL = "odsączanie trucizny";
    }
    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        this.incrDetermination(1);
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 1, this._resolutionPL);
    }
}
exports.Poisoning = Poisoning;
//# sourceMappingURL=Poisoning.js.map