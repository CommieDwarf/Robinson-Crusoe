import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../../interfaces/EventService/EVENT_CARD";
import {BasicResources} from "../../../ResourceService/BasicResources";
import {ACTION} from "../../../../../../interfaces/ACTION";

export class StormDamage extends EventCard implements IEventCard {
    protected readonly _namePL = "niszczycielski huragan";
    protected readonly _resolutionPL = "reperacja obozowiska";

    constructor(game: IGame) {
        super(
            EVENT_CARD.STORM_DAMAGE,
            ACTION.GATHER,
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
        //TODO: choose lvl down half roof or palisade.
    }

    triggerThreatEffect() {
        //TODO: choose -1 roof or palisade
    }

    fullFill() {
        //TODO: choose +1 roof or palisade if shelter is built.
    }
}
