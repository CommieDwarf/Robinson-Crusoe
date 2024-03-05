import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {ACTION} from "../../../../types/ACTION";

export class Catastrophe extends EventCard implements IEventCard {
    protected _namePL = "kataklizm";
    protected _resolutionPL = "naprawa narzędzi";

    constructor(game: IGame) {
        super(
            EVENT_CARD.BEAR,
            ACTION.BUILD,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO: lock equipment items from usage.
        //TODO: unlock after action Phase.
    }

    triggerThreatEffect() {
        //TODO: discard 1 equipment item and cancel it's effect if possible
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
