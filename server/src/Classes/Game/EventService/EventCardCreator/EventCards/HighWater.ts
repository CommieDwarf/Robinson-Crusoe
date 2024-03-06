import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {ACTION} from "@shared/types/Game/ACTION";

export class HighWater extends EventCard implements IEventCard {
    protected readonly _namePL = "rwąca rzeka";
    protected readonly _resolutionPL = "odpływ";

    constructor(game: IGame) {
        super(
            EVENT_CARD.HIGH_WATER,
            ACTION.GATHER,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: "wood",
                optionalResource: null,

            },
            game
        );
    }

    //TODO: implement if shovel is built, no wood required.

    triggerEventEffect() {
        //TODO: set exploration question mark.
    }

    triggerThreatEffect() {
        //TODO: check rules in the guide.
    }

    fullFill() {
        this.incrDetermination(2);
    }
}
