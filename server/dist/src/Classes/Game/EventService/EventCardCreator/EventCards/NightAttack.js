"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NightAttack = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const ACTION_1 = require("@shared/types/Game/ACTION");
class NightAttack extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.NIGHT_ATTACK, ACTION_1.ACTION.EXPLORE, {
            pawns: 1,
            invention: null,
            construction: {
                type: Construction_1.CONSTRUCTION.WEAPON,
                lvl: 3,
            },
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "nocny atak";
        this._resolutionPL = "w poszukiwaniu bestii";
    }
    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._name);
        //TODO: if possible peek beast from hunting deck.
    }
    triggerThreatEffect() {
        if (this._game.beastService.deckCount > 0) {
            this._game.beastService.removeBeastFromDeck();
        }
    }
    fullFill() {
        //TODO: fight beast from deck. ignore it's strength.
    }
}
exports.NightAttack = NightAttack;
//# sourceMappingURL=NightAttack.js.map