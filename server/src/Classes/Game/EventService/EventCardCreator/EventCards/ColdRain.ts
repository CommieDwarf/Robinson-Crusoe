import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {ACTION} from "@shared/types/Game/ACTION";

export class ColdRain extends EventCard implements IEventCard {
    protected readonly _namePL = "przenikliwie zimny deszcz";
    protected readonly _resolutionPL = "irygacja";

    constructor(game: IGame) {
        super(
            EVENT_CARD.COLD_RAIN,
            ACTION.EXPLORE,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.weatherService.setToken("rain", true, this._namePL);
    }

    triggerThreatEffect() {
        this._game.weatherService.setToken("rain", true, this._namePL);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
