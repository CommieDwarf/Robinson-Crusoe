import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";
import {ACTION} from "../../../../types/ACTION";

export class Jaguar extends EventCard implements IEventCard {
    protected readonly _namePL = "jaguar";
    protected readonly _resolutionPL = "warta";

    constructor(game: IGame) {
        super(
            EVENT_CARD.JAGUAR,
            ACTION.BUILD,
            {
                pawns: 1,
                invention: null,
                construction: {
                    type: CONSTRUCTION.WEAPON,
                    lvl: 2,
                },
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
    }

    fullFill() {
        //nothing
    }
}
