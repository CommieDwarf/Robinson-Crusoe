import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {ACTION} from "../../../../../interfaces/ACTION";

export class StrokeOfFate extends EventCard implements IEventCard {
    protected readonly _namePL = "zły los";
    protected readonly _resolutionPL = "pokrzepiający odpoczynek";

    constructor(game: IGame) {
        super(
            EVENT_CARD.STROKE_OF_FATE,
            ACTION.GATHER,
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
        if (this._game.eventService.left) {
            this._game.eventService.left.triggerThreatEffect();
            this._game.eventService.left = null;
        }
        if (this._game.eventService.right) {
            this._game.eventService.right.triggerThreatEffect();
            this._game.eventService.right = null;
        }
    }

    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            1,
            this._namePL
        );
    }

    fullFill() {
        this.incrDetermination(3);
    }
}
