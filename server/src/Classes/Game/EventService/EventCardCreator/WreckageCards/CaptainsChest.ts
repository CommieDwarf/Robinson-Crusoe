import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {WRECKAGE_CARD} from "@shared/types/Game/EventService/EVENT_CARD";

export class CaptainsChest extends EventCard implements IEventCard {
    protected _namePL = "kufer kapitana";
    protected _resolutionPL = "wyprawa po skarby";

    constructor(game: IGame) {
        super(
            WRECKAGE_CARD.CAPTAINS_CHEST,
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
        // nothing is happening
    }

    triggerThreatEffect() {
        // nothing
    }

    fullFill() {
        const helper = this.getHelperPawn();
        this._game.resourceService.addBasicResourceToOwned("wood", 1, this._resolutionPL);
        if (helper) {
            this._game.equipmentService.addRandomItem(this._resolutionPL);
        }
    }
}
