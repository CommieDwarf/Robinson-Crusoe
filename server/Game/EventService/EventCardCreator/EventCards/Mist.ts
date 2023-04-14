import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {ACTION} from "../../../../../interfaces/ACTION";

export class Mist extends EventCard implements IEventCard {
    protected readonly _namePL = "mgła";
    protected readonly _resolutionPL = "odszukanie dawnego tropu";

    constructor(game: IGame) {
        super(
            EVENT_CARD.MIST,
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
        //TODO: put +1 required helper on explore action
        this._game.actionService.addGlobalCostModifier(ACTION.EXPLORE, "helper", true, this._namePL);
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
        this._game.actionService.setAdventureToken(ACTION.GATHER, true, this._namePL);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
