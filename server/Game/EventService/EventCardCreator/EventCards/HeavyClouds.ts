import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {BasicResources} from "../../../ResourceService/BasicResources";
import {ACTION} from "../../../../../interfaces/ACTION";

export class HeavyClouds extends EventCard implements IEventCard {
    protected readonly _namePL = "deszczowe chmury";
    protected readonly _resolutionPL = "wzmocnienie dachu";

    constructor(game: IGame) {
        super(
            EVENT_CARD.HEAVY_CLOUDS,
            ACTION.BUILD,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: new BasicResources(0, 0, 0, 1),
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
