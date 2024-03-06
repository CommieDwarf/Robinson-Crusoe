import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

export class Frost extends EventCard implements IEventCard {
    protected readonly _namePL = "frost";
    protected readonly _resolutionPL = "ogrzanie obozu";

    constructor(game: IGame) {
        super(
            EVENT_CARD.FROST,
            ACTION.GATHER,
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
        this._game.weatherService.setToken("snow", true, this._namePL);
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
    }

    fullFill() {
        this.incrDetermination(2);
    }
}
