"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HowlingFromTheWoods = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const BeastService_1 = require("../../../BeastService/BeastService");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
class HowlingFromTheWoods extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.HOWLING_FROM_THE_WOODS, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.FIRE,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "wycie od strony lasu";
        this._resolutionPL = "wyprawa";
    }
    triggerEventEffect() {
        const beasts = this._game.beastService.getBeastsFromStack(3);
        const strongestBeast = BeastService_1.BeastService.getStrongestBeast(beasts);
        if (strongestBeast) {
            this._game.beastService.addBeastToDeck(strongestBeast);
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.BEAST_SHUFFLED_INTO_EVENT_DECK,
                amount: 1,
                subject1: "",
                subject2: ""
            }, "neutral", this._name);
        }
    }
    triggerThreatEffect() {
        // TODO: fight beast from top of the deck.
    }
    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 2, this.name);
        this._game.beastService.swapDeckTopToBottom();
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.BEAST_MOVED_TO_BOTTOM_OF_DECK,
            amount: 1,
            subject1: "",
            subject2: ""
        }, "positive", this._resolutionPL);
    }
}
exports.HowlingFromTheWoods = HowlingFromTheWoods;
//# sourceMappingURL=HowlingFromTheWoods.js.map