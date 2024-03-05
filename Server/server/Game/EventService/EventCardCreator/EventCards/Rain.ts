import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../../interfaces/EventService/EVENT_CARD";
import {ACTION} from "../../../../../../interfaces/ACTION";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Rain extends EventCard implements IEventCard {
    protected readonly _namePL = "deszcz";
    protected readonly _resolutionPL = "wzmocniony dach";

    constructor(game: IGame) {
        super(
            EVENT_CARD.RAIN,
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
        this._game.weatherService.tokens.rain = true;
    }

    triggerThreatEffect() {
        this._game.weatherService.tokens.rain = true;
    }

    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 1, this.name);
    }
}
