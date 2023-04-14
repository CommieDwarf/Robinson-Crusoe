import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {ACTION} from "../../../../../interfaces/ACTION";

export class BadFeelings extends EventCard implements IEventCard {
    protected _namePL = "złe przeczucia";
    protected _resolutionPL = "ostrożne zbieranie";

    constructor(game: IGame) {
        super(
            EVENT_CARD.BAD_FEELINGS,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.actionService.setReRollToken(ACTION.GATHER, true, this._namePL);
    }

    triggerThreatEffect() {
        this._game.actionService.setReRollToken(ACTION.GATHER, true, this._namePL);
    }

    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(
            leader,
            1,
            this._resolutionPL
        );
    }
}
