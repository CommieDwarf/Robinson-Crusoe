import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

export class SearchingForANewPath extends EventCard implements IEventCard {
    protected readonly _namePL = "powalone drzewa";
    protected readonly _resolutionPL = "poszukiwanie nowej ścieżki";

    constructor(game: IGame) {
        super(
            EVENT_CARD.SEARCHING_FOR_A_NEW_PATH,
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
    }

    triggerThreatEffect() {
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, this._namePL);
        this._game.actionService.setAdventureToken(ACTION.GATHER, true, this._namePL);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
