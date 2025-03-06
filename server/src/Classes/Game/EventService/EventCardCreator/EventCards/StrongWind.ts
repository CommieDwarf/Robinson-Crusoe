import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";

export class StrongWind extends EventCard implements IEventCard {
    protected readonly _namePL = "silny wiatr";
    protected readonly _resolutionPL = "konserwacja narzędzi";

    constructor(game: IGame) {
        super(
            EVENT_CARD.STRONG_WIND,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
    }

    triggerThreatEffect() {
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
