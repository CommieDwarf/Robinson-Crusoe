import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";
import {ACTION} from "../../../../types/ACTION";

export class PredatorInTheVicinity extends EventCard implements IEventCard {
    protected readonly _namePL = "drapieżniki w okolicy";
    protected readonly _resolutionPL = "przepędzenie drapieżnika";

    constructor(game: IGame) {
        super(
            EVENT_CARD.PREDATOR_IN_THE_VICINITY,
            ACTION.EXPLORE,
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
        //TODO: set animal dice at weather
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
