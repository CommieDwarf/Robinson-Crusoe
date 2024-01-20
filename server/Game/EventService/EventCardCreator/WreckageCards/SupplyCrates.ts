import {EventCard} from "../EventCard";
import {
    EVENT_TYPE,
    IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {WRECKAGE_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";

export class SupplyCrates extends EventCard implements IEventCard {
    protected readonly _namePL = "skrzynie z jedzeniem";
    protected readonly _resolutionPL = "wyprawa po jedzenie";

    constructor(game: IGame) {
        super(
            WRECKAGE_CARD.SUPPLY_CRATES,
            EVENT_TYPE.WRECKAGE,
            {
                optionalResource: null,
                pawns: 2,
                invention: null,
                construction: null,
                resource: null
            },
            game
        );
    }

    triggerEventEffect() {
        return;
    }

    triggerThreatEffect() {
        return;
    }

    fullFill() {
        this._game.resourceService.addBasicResourceToOwned("food", 1, this.name);
        const helper = this.getHelperPawn();
        if (helper) {
            this._game.resourceService.addBasicResourceToOwned(
                "dryFood",
                1,
                this.name
            );
        }
    }
}
