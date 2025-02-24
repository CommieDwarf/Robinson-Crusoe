import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

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

    }

    triggerThreatEffect() {
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
