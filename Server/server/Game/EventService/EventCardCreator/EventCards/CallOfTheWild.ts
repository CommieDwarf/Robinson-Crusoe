import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../../interfaces/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../../../interfaces/InventionService/Invention";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";

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
        //TODO: put beast token on hunt action.
    }

    triggerThreatEffect() {
        //TODO: same as triggerEffect
    }

    fullFill() {
        this._game.resourceService.addBasicResourceToFuture(
            "food",
            1,
            this._resolutionPL
        );
    }
}
