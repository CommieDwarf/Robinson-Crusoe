import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";

export class WinterDepression extends EventCard implements IEventCard {
    protected readonly _namePL = "zimowa depresja";
    protected readonly _resolutionPL = "rozgrzanie";

    constructor(game: IGame) {
        super(
            EVENT_CARD.WINTER_DEPRESSION,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: "food",
                optionalResource: null,

            },
            game
        );
    }

    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._name);
    }

    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            1,
            this._namePL
        );
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
