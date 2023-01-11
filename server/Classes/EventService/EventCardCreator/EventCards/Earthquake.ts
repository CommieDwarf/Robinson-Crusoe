import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../../interfaces/InventionService/Invention";

export class Earthquake extends EventCard implements IEventCard {
    protected readonly _namePL = "trzęsienie ziemi";
    protected readonly _resolutionPL = "budowa przejścia";

    constructor(game: IGame) {
        super(
            EVENT_CARD.EARTHQUAKE,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: null,
            },
            game
        );
    }

    triggerEffect() {


        //TODO: if possible flip chosen tile around camp.
        //TODO: treat as unavailable.
    }

    triggerThreatEffect() {
        // tile becomes permanently unavailable
    }

    fullFill() {
        //TODO: flip back tile
    }
}
