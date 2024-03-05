import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../../interfaces/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../../../interfaces/InventionService/Invention";
import {ACTION} from "../../../../../../interfaces/ACTION";

export class RagingRiver extends EventCard implements IEventCard {
    protected readonly _namePL = "rozszalała rzeka";
    protected readonly _resolutionPL = "budowa fosy";

    constructor(game: IGame) {
        super(
            EVENT_CARD.RAGING_RIVER,
            ACTION.GATHER,
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
        //TODO: this round in production Phase get Math.floor(1/2) of resources.
    }

    triggerThreatEffect() {
        //TODO: no resources in production Phase.
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
