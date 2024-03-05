import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {ACTION} from "../../../../types/ACTION";

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
        //TODO: put reRoll on explore action.
        this._game.actionService.setReRollToken(ACTION.EXPLORE, true, this._namePL);
    }

    triggerThreatEffect() {
        //TODO: put question marks on explore and gather.
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, this._namePL);
        this._game.actionService.setAdventureToken(ACTION.GATHER, true, this._namePL);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
