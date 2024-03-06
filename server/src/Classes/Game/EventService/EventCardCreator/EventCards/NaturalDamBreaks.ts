import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";

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
