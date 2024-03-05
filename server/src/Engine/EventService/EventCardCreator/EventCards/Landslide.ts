import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../types/InventionService/Invention";
import {ACTION} from "../../../../types/ACTION";

export class Landslide extends EventCard implements IEventCard {
    protected readonly _namePL = "osuwisko";
    protected readonly _resolutionPL = "zabezpieczenie obozowiska";

    constructor(game: IGame) {
        super(
            EVENT_CARD.LANDSLIDE,
            ACTION.BUILD,
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
        //TODO: move camp, check guide
    }

    triggerThreatEffect() {
        //TODO: no resources in production Phase.
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
