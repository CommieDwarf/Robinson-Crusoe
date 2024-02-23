import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../../interfaces/InventionService/Invention";

export class NaturalDamBreaks extends EventCard implements IEventCard {
    protected readonly _namePL = "pęka naturalna tama";
    protected readonly _resolutionPL = "zabezpieczenie";

    constructor(game: IGame) {
        super(
            EVENT_CARD.NATURAL_DAM_BREAKS,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO: +1 wood but no food in production Phase.
        //TODO: put explore question mark.
    }

    triggerThreatEffect() {
        //TODO: if possible flip 2 invention cards.
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
