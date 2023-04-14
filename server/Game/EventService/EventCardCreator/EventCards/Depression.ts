import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Depression extends EventCard implements IEventCard {
    protected readonly _namePL = "depresja";
    protected readonly _resolutionPL = "pocieszenie";

    constructor(game: IGame) {
        super(
            EVENT_CARD.DEPRESSION,
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
        //TODO: discard 2 inventions.
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            1,
            this._namePL
        );
    }

    triggerThreatEffect() {
        this._game.moraleService.lvlDown(1, this._namePL);
        //TODO: discard 2 inventions.
    }

    fullFill() {
        this.incrDetermination(2);
    }
}
