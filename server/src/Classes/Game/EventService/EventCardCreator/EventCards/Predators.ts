import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ACTION} from "@shared/types/Game/ACTION";

export class Predators extends EventCard implements IEventCard {
    protected readonly _namePL = "drapieżniki";
    protected readonly _resolutionPL = "walka z drapieżnikami";

    constructor(game: IGame) {
        super(
            EVENT_CARD.PREDATORS,
            ACTION.EXPLORE,
            {
                pawns: 2,
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
        this.triggerEventEffect();
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
