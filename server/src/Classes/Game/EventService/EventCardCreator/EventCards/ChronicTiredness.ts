import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

export class ChronicTiredness extends EventCard implements IEventCard {
    protected _namePL = "chroniczne zmęczenie";
    protected _resolutionPL = "regeneracja";

    constructor(game: IGame) {
        super(
            EVENT_CARD.CHRONIC_TIREDNESS,
            ACTION.EXPLORE,
            {
                pawns: 2,
                invention: null,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO: in this round night Phase increase food consumption by 1.
    }

    triggerThreatEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
