import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ACTION} from "@shared/types/Game/ACTION";

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
