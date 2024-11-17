import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {WRECKAGE_CARD} from "@shared/types/Game/EventService/EVENT_CARD";

export class SupplyCrates extends EventCard implements IEventCard {
    protected readonly _namePL = "skrzynie z jedzeniem";
    protected readonly _resolutionPL = "wyprawa po jedzenie";

    constructor(game: IGame) {
        super(
            WRECKAGE_CARD.SUPPLY_CRATES,
            EVENT_TYPE.WRECKAGE,
            {
                optionalResource: null,
                pawns: 1,
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
        this._game.resourceService.addBasicResourceToFuture("food", 1, this.name);
        const helper = this.getHelperPawn();
        if (helper) {
            this._game.resourceService.addBasicResourceToFuture(
                "dryFood",
                1,
                this.name
            );
        }
    }
}
