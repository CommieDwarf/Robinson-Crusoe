import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {BasicResources} from "../../../ResourceService/BasicResources";
import {ACTION} from "../../../../../interfaces/ACTION";

export class Precipice extends EventCard implements IEventCard {
    protected readonly _namePL = "przepaść";
    protected readonly _resolutionPL = "budowa mostu";

    constructor(game: IGame) {
        super(
            EVENT_CARD.PRECIPICE,
            ACTION.EXPLORE,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: new BasicResources(0, 0, 2, 0),
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO: if possible make tile next to camp unavailable
    }

    triggerThreatEffect() {
        //tile stays unavailable
    }

    fullFill() {
        //TODO: tile becomes available.
        this.incrDetermination(3);
    }
}
