import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../../interfaces/EventService/EVENT_CARD";
import {BasicResources} from "../../../ResourceService/BasicResources";
import {ACTION} from "../../../../../../interfaces/ACTION";

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
        //TODO: choose -1 roof or -1 palisade
    }

    triggerThreatEffect() {
        //TODO: same as triggerEffect
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
