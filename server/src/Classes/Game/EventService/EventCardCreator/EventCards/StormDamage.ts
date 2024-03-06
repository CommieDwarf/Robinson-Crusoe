import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

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
