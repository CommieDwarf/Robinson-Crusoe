import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../types/InventionService/Invention";
import {ACTION} from "../../../../types/ACTION";

export class HeavyRainIsComing extends EventCard implements IEventCard {
    protected readonly _namePL = "nadchodzi ulewa";
    protected readonly _resolutionPL = "irygacja";

    constructor(game: IGame) {
        super(
            EVENT_CARD.HEAVY_RAIN_IS_COMING,
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
        this._game.weatherService.setToken("rain", true, this._namePL);
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
