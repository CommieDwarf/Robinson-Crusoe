import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {BeastService} from "../../../BeastService/BeastService";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";

export class HowlingFromTheWoods extends EventCard implements IEventCard {
    protected readonly _namePL = "wycie od strony lasu";
    protected readonly _resolutionPL = "wyprawa";

    constructor(game: IGame) {
        super(
            EVENT_CARD.HOWLING_FROM_THE_WOODS,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: INVENTION_STARTER.FIRE,
                construction: null,
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        const beasts = this._game.beastService.getBeastsFromStack(3);
        const strongestBeast = BeastService.getStrongestBeast(beasts);
        if (strongestBeast) {
            this._game.beastService.addBeastToDeck(strongestBeast);
            this._game.logService.addMessage({
                code: LOG_CODE.BEAST_SHUFFLED_INTO_EVENT_DECK,
                amount: 1,
                subject1: "",
                subject2: ""
            }, "neutral", this._name)
        }
    }

    triggerThreatEffect() {
    }

    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 2, this.name);
        this._game.beastService.swapDeckTopToBottom();
        this._game.logService.addMessage({
            code: LOG_CODE.BEAST_MOVED_TO_BOTTOM_OF_DECK,
            amount: 1,
            subject1: "",
            subject2: ""
        }, "positive", this._resolutionPL)
    }
}
