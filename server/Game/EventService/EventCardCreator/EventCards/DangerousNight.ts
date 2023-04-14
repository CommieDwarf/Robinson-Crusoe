import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {CONSTRUCTION} from "../../../../../interfaces/ConstructionService/Construction";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";

export class DangerousNight extends EventCard implements IEventCard {
    protected readonly _namePL = "niebezpieczna noc";
    protected readonly _resolutionPL = "budowa zabezpieczeń";

    constructor(game: IGame) {
        super(
            EVENT_CARD.DANGEROUS_NIGHT,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: {
                    type: CONSTRUCTION.WEAPON,
                    lvl: 2,
                },
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        // TODO: implement adding beast to event cards.
        this._game.eventService.addCardToTopOfStack(undefined);
    }

    triggerThreatEffect() {
        // nothing happens.
    }

    fullFill() {
        // TODO: shuffle beast in to the event cards.
    }
}
