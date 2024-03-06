import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

export class MessInTheCamp extends EventCard implements IEventCard {
    protected readonly _namePL = "bałagan w obozie";
    protected readonly _resolutionPL = "porządkowanie dobytku";

    constructor(game: IGame) {
        super(
            EVENT_CARD.MESS_IN_THE_CAMP,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.actionService.addGlobalCostModifier(ACTION.ARRANGE_CAMP, "helper", true, this._namePL);
    }

    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            1,
            this._namePL
        );
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
