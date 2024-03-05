import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../types/InventionService/Invention";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";
import {ACTION} from "../../../../types/ACTION";

export class Storm extends EventCard implements IEventCard {
    protected readonly _namePL = "sztorm";
    protected readonly _resolutionPL = "wzmocnienie obozowiska";

    constructor(game: IGame) {
        super(
            EVENT_CARD.STORM,
            ACTION.GATHER,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: "wood",
                optionalResource: null,

            },
            game
        );
    }

    triggerEventEffect() {
        this._game.weatherService.setToken("storm", true, this._namePL);
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
