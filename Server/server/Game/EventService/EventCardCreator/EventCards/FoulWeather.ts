import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../../interfaces/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../../../interfaces/InventionService/Invention";
import {ACTION} from "../../../../../../interfaces/ACTION";
import {TILE_RESOURCE_ACTION} from "../../../../../../interfaces/TileService/TileResourceService";

export class FoulWeather extends EventCard implements IEventCard {
    protected readonly _namePL = "załamanie pogody";
    protected readonly _resolutionPL = "zabezpieczenie źródeł";

    constructor(game: IGame) {
        super(
            EVENT_CARD.FOUL_WEATHER,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.actionService.addGlobalCostModifier(ACTION.GATHER, "helper", true, this._namePL)
    }

    triggerThreatEffect() {
        const tiles = this._game.tileService.tilesAroundCamp;
        this._game.tileService.markResourceTilesForActionOrGetHurt(tiles, TILE_RESOURCE_ACTION.DEPLETE, 2, this._namePL, null);
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
