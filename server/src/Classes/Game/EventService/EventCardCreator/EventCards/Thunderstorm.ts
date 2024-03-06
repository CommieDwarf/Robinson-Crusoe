import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {ACTION} from "@shared/types/Game/ACTION";

export class Thunderstorm extends EventCard implements IEventCard {
    protected readonly _namePL = "burza z piorunami";
    protected readonly _resolutionPL = "odgrodzenie ognia";

    constructor(game: IGame) {
        super(
            EVENT_CARD.THUNDERSTORM,
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
        //TODO deplete closest wood else Players get hurt
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
    }

    fullFill() {
        //TODO: reverse depletion
    }
}
