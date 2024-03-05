import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {WRECKAGE_CARD} from "../../../../types/EventService/EVENT_CARD";

export class WreckedLifeboat extends EventCard implements IEventCard {
    protected readonly _namePL = "resztki szalupy";
    protected readonly _resolutionPL = "wyprawa po drewno";

    constructor(game: IGame) {
        super(
            WRECKAGE_CARD.WRECKED_LIFEBOAT,
            EVENT_TYPE.WRECKAGE,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //nothing
    }

    triggerThreatEffect() {
        //nothing
    }

    fullFill() {
        const helperPawn = this.getHelperPawn();
        if (helperPawn) {
            this._game.resourceService.addBasicResourceToFuture(
                "wood",
                2,
                this.resolutionPL
            );
        } else {
            this._game.resourceService.addBasicResourceToOwned(
                "wood",
                1,
                this.resolutionPL
            );
        }
    }
}
