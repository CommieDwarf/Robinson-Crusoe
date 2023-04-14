import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {ACTION} from "../../../../../interfaces/ACTION";

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
        this._game.actionService.setAdventureToken(ACTION.BUILD, true, this._namePL);
    }

    triggerThreatEffect() {
        this._game.moraleService.lvlDown(2, this._namePL);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
