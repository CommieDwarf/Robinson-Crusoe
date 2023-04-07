import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {CONSTRUCTION} from "../../../../../interfaces/ConstructionService/Construction";
import {ACTION} from "../../../../../interfaces/ACTION";

export class CulledArea extends EventCard implements IEventCard {
    protected readonly _namePL = "przetrzebiona okolica";
    protected readonly _resolutionPL = "obfite polowanie";

    constructor(game: IGame) {
        super(
            EVENT_CARD.CULLED_AREA,
            ACTION.GATHER,
            {
                pawns: 1,
                invention: null,
                construction: {
                    type: CONSTRUCTION.WEAPON,
                    lvl: 2,
                },
                resource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO: no food from production in this round
    }

    triggerThreatEffect() {
        //nothing
    }

    fullFill() {
        this._game.resourceService.addBasicResourceToFuture(
            "food",
            2,
            this._resolutionPL
        );
    }
}
