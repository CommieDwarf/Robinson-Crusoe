import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";
import {ACTION} from "../../../../types/ACTION";

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
        //TODO: deplete closest food source or all Players get hurt.
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
    }

    fullFill() {
        this.incrDetermination(1);
        //TODO: reverse resource depletion.
    }
}
