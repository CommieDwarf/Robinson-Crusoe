import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {ACTION} from "@shared/types/Game/ACTION";

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
    }

    triggerThreatEffect() {
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
