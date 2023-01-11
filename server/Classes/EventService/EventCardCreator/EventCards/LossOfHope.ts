import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {CONSTRUCTION} from "../../../../../interfaces/ConstructionService/Construction";

export class LossOfHope extends EventCard implements IEventCard {
    protected readonly _namePL = "utrata nadziei";
    protected readonly _resolutionPL = "odpoczynek";

    constructor(game: IGame) {
        super(
            EVENT_CARD.LOSS_OF_HOPE,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: null,
            },
            game
        );
    }

    triggerEffect() {


        //TODO: In this round prime player can use only rest, arrange camp and build
    }

    triggerThreatEffect() {
        this._game.moraleService.lvlDown(2, this._namePL);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
