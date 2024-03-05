import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";

export class Council extends EventCard implements IEventCard {
    protected readonly _namePL = "narada";
    protected readonly _resolutionPL = "burza mózgów";

    constructor(game: IGame) {
        super(
            EVENT_CARD.COUNCIL,
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
        //TODO: discard 3 inventions
    }

    triggerThreatEffect() {
        //TODO: discard 2 inventions
    }

    fullFill() {
        this.incrDetermination(1);
        //TODO: get 1 chosen invention
    }
}
