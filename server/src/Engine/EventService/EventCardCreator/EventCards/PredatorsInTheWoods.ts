import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";
import {ACTION} from "../../../../types/ACTION";

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
        //TODO: put beast token on explore action.
    }

    triggerThreatEffect() {
        //TODO: discard beast token.
        this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    }

    fullFill() {
        //TODO: discard beast token.
        this.incrDetermination(1);
    }
}
