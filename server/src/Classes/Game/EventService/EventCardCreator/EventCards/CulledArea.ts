import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ACTION} from "@shared/types/Game/ACTION";

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
                optionalResource: null,
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
