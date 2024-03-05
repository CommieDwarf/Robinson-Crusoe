import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../../interfaces/EventService/EVENT_CARD";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";

export class Otters extends EventCard implements IEventCard {
    protected readonly _namePL = "wydry";
    protected readonly _resolutionPL = "udane polowanie";

    constructor(game: IGame) {
        super(
            EVENT_CARD.OTTERS,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: {
                    type: CONSTRUCTION.WEAPON,
                    lvl: 1,
                },
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO: dasdas
    }

    triggerThreatEffect() {
    }

    fullFill() {
        //TODO: reverse resources's depletion
    }
}
