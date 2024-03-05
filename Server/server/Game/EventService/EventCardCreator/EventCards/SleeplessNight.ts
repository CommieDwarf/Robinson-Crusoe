import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../../interfaces/EventService/EVENT_CARD";
import {ACTION} from "../../../../../../interfaces/ACTION";

export class SleeplessNight extends EventCard implements IEventCard {
    protected readonly _namePL = "bezsenna noc";
    protected readonly _resolutionPL = "odpoczynek";

    constructor(game: IGame) {
        super(
            EVENT_CARD.SLEEPLESS_NIGHT,
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
        this._game.actionService.setReRollToken(ACTION.EXPLORE, true, this._namePL);
        this._game.actionService.setReRollToken(ACTION.GATHER, true, this._namePL);
        this._game.actionService.setReRollToken(ACTION.BUILD, true, this._namePL);
    }

    triggerThreatEffect() {
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, this._namePL);
        this._game.actionService.setAdventureToken(ACTION.GATHER, true, this._namePL);
    }

    fullFill() {
        this._game.characterService.incrDetermination(
            this.getLeaderCharacter(),
            1,
            this.name
        );
    }
}
