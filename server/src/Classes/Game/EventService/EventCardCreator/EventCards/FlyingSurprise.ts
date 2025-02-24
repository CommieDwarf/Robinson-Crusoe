import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

export class FlyingSurprise extends EventCard implements IEventCard {
    protected readonly _namePL = "latająca niespodzianka";
    protected readonly _resolutionPL = "sprzątanie po wypadku";

    constructor(game: IGame) {
        super(
            EVENT_CARD.FLYING_SURPRISE,
            ACTION.BUILD,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: "wood",
                optionalResource: null,

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
