import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../../interfaces/InventionService/Invention";
import {ACTION} from "../../../../../interfaces/ACTION";

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
                resource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO deplete closest wood else players get hurt
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
    }

    fullFill() {
        //TODO: reverse depletion
    }
}
