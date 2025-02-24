import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";

export class CallOfTheWild extends EventCard implements IEventCard {
    protected _namePL = "zew natury";
    protected _resolutionPL = "zaciekłe polowanie";

    constructor(game: IGame) {
        super(
            EVENT_CARD.CALL_OF_THE_WILD,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: {
                    type: CONSTRUCTION.WEAPON,
                    lvl: 2,
                },
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
    }

    triggerThreatEffect() {
    }

    fullFill() {
        this._game.resourceService.addBasicResourceToFuture(
            "food",
            1,
            this._resolutionPL
        );
    }
}
