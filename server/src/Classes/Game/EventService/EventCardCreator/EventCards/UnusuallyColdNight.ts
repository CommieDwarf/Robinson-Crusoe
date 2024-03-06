import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";

export class UnusuallyColdNight extends EventCard implements IEventCard {
    protected readonly _namePL = "niezwykle zimna noc";
    protected readonly _resolutionPL = "ocieplenie obozowiska";

    constructor(game: IGame) {
        super(
            EVENT_CARD.UNUSUALLY_COLD_NIGHT,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: "wood",
                optionalResource: null,

            },
            game
        );
    }

    triggerEventEffect() {
        this._game.resourceService.spendBasicResourceOrGetHurt(
            "wood",
            2,
            this.name
        );
    }

    triggerThreatEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this.name);
    }

    fullFill() {
        this._game.characterService.incrDetermination(
            this.getLeaderCharacter(),
            1,
            this.name
        );
    }
}
