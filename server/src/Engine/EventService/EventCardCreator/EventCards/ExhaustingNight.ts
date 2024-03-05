import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {ACTION} from "../../../../types/ACTION";

export class ExhaustingNight extends EventCard implements IEventCard {
    protected readonly _namePL = "wyczerpująca noc";
    protected readonly _resolutionPL = "odpoczynek";

    constructor(game: IGame) {
        super(
            EVENT_CARD.EXHAUSTING_NIGHT,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.actionService.setReRollToken(ACTION.BUILD, true, this._namePL)
    }

    triggerThreatEffect() {
        this._game.moraleService.lvlDown(2, this._namePL);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
