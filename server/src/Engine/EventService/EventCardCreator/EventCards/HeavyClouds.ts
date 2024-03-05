import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {ACTION} from "../../../../types/ACTION";

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
                resource: "leather",
                optionalResource: null,
                
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
