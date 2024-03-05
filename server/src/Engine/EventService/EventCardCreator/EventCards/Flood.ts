import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../types/InventionService/Invention";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";
import {ACTION} from "../../../../types/ACTION";

export class Flood extends EventCard implements IEventCard {
    protected readonly _namePL = "powódź";
    protected readonly _resolutionPL = "budowa odpływu";

    constructor(game: IGame) {
        super(
            EVENT_CARD.FLOOD,
            ACTION.EXPLORE,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO: choose: flip invention or -1 weapon or -1 palisade or every player gets hurt.
    }

    triggerThreatEffect() {
        this._game.constructionService.lvlDownOrGetHurt(
            CONSTRUCTION.PALISADE,
            1,
            this._namePL
        );
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
