import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";

export class PredatorIsNear extends EventCard implements IEventCard {
    protected readonly _namePL = "drapieżnik w okolicy";
    protected readonly _resolutionPL = "walka o pożywienie";

    constructor(game: IGame) {
        super(
            EVENT_CARD.PREDATOR_IS_NEAR,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: {
                    type: CONSTRUCTION.WEAPON,
                    lvl: 2,
                },
                resource: null, optionalResource: null,
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
