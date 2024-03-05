import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {ACTION} from "../../../../types/ACTION";

export class AwfulWeather extends EventCard implements IEventCard {
    _namePL = "okropna pogoda";
    _resolutionPL = "wiatrochron";

    constructor(game: IGame) {
        super(
            EVENT_CARD.AWFUL_WEATHER,
            ACTION.EXPLORE,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: "wood",
                optionalResource: null,
                
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.weatherService.setToken("rain", true, this._namePL);
    }

    triggerThreatEffect() {
        this._game.weatherService.setToken("snow", true, this._namePL)
    }

    fullFill() {
        const character = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(
            character,
            1,
            `${this.name} (${character.name})`
        );
    }
}
