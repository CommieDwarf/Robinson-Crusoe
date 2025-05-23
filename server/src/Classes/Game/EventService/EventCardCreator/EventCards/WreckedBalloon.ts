import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";

export class WreckedBalloon extends EventCard implements IEventCard {
    protected readonly _namePL = "roztrzaskany balon";
    protected readonly _resolutionPL = "poszukiwania";

    constructor(game: IGame) {
        super(
            EVENT_CARD.WRECKED_BALLOON,
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
        this._game.moraleService.lvlDown(1, this._namePL);
    }

    triggerThreatEffect() {
        //nothing happens
    }

    fullFill() {
        this._game.mysteryService.startDrawingCards(0, 0, 1, this.getLeaderCharacter());
    }
}
