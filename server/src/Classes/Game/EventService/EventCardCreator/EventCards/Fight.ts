import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

export class Fight extends EventCard implements IEventCard {
    protected readonly _namePL = "bójka";
    protected readonly _resolutionPL = "przemowa";

    constructor(game: IGame) {
        super(
            EVENT_CARD.FIGHT,
            ACTION.BUILD,
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
        this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    }

    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            2,
            this._namePL
        );
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
