import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../../interfaces/EventService/EVENT_CARD";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Despondency extends EventCard implements IEventCard {
    protected readonly _namePL = "brak wiary";
    protected readonly _resolutionPL = "mobilizacja";

    constructor(game: IGame) {
        super(
            EVENT_CARD.DESPONDENCY,
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
        //TODO: next player becomes prime.
    }

    triggerThreatEffect() {
        this._game.moraleService.lvlDown(2, this._namePL);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
