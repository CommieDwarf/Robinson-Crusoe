import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

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
