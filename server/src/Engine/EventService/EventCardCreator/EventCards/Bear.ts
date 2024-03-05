import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../types/InventionService/Invention";

export class Bear extends EventCard implements IEventCard {
    protected _namePL = "niedźwiedź";
    protected _resolutionPL = "naprawa";

    constructor(game: IGame) {
        super(
            EVENT_CARD.BEAR,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO: put mark on arrange camp.
        //TODO arrange camp discards mark. No stuff gained.
    }

    triggerThreatEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            1,
            this._namePL
        );
    }

    fullFill() {
        this._game.characterService.incrDetermination(
            this.getLeaderCharacter(),
            1,
            this._resolutionPL
        );
    }
}
