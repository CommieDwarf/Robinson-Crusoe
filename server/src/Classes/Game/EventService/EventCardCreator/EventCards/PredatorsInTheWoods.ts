import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ACTION} from "@shared/types/Game/ACTION";

export class PredatorsInTheWoods extends EventCard implements IEventCard {
    protected readonly _namePL = "drapieżniki w pobliżu";
    protected readonly _resolutionPL = "poszukiwania drapieżnika";

    constructor(game: IGame) {
        super(
            EVENT_CARD.PREDATORS_IN_THE_WOODS,
            ACTION.EXPLORE,
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
    }

    triggerThreatEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
