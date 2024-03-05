import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../../interfaces/EventService/EVENT_CARD";

export class Argument extends EventCard implements IEventCard {
    protected _namePL = "kłótnia";
    protected _resolutionPL = "pogodzenie się";

    constructor(game: IGame) {
        super(
            EVENT_CARD.ARGUMENT,
            EVENT_TYPE.BOOK,
            {
                pawns: 2,
                invention: null,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.eventService.setSpecialEffect("argument", true, this.name);
    }

    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            1,
            this.name
        );
        this._game.moraleService.lvlDown(1, this.name);
    }

    fullFill() {
        const leader = this.getLeaderCharacter();

        this._game.moraleService.lvlUp(1, this.name);
        this._game.characterService.incrDetermination(leader, 1, this.name);
    }
}
