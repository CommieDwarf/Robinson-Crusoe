import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../types/InventionService/Invention";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";

export class RavenousPredators extends EventCard implements IEventCard {
    protected readonly _namePL = "wygłodniałe drapieżniki";
    protected readonly _resolutionPL = "przeganianie zwierząt";

    constructor(game: IGame) {
        super(
            EVENT_CARD.RAVENOUS_PREDATORS,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: INVENTION_STARTER.FIRE,
                construction: null,
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO: set beast strength +1.
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
