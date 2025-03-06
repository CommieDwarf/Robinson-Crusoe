import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {ACTION} from "@shared/types/Game/ACTION";

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
    }

    triggerThreatEffect() {
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
