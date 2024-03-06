import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

export class MemoriesOfTheCruise extends EventCard implements IEventCard {
    protected readonly _namePL = "wspomnienia z rejsu";
    protected readonly _resolutionPL = "szanty";

    constructor(game: IGame) {
        super(
            EVENT_CARD.MEMORIES_OF_THE_CRUISE,
            ACTION.BUILD,
            {
                pawns: 2,
                invention: null,
                construction: null,
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._namePL);
    }

    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            1,
            this._namePL
        );
    }

    fullFill() {
        this.incrDetermination(2);
        this._game.moraleService.lvlUp(1, this._resolutionPL);
    }
}
