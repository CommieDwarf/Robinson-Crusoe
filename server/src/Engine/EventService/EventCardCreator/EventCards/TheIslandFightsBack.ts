import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";

export class TheIslandFightsBack extends EventCard implements IEventCard {
    protected readonly _namePL = "wyspa się buntuje";
    protected readonly _resolutionPL = "ratunek";

    constructor(game: IGame) {
        super(
            EVENT_CARD.THE_ISLAND_FIGHTS_BACK,
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
        //TODO: book effect..
    }

    triggerThreatEffect() {
        //TODO: book effect...
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
