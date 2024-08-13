import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {ACTION} from "@shared/types/Game/ACTION";
import {TILE_RESOURCE_ACTION} from "@shared/types/Game/TileService/TileResourceService";

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
        this._game.actionService.addGlobalCostModifier(ACTION.GATHER, "helper", true, this._name)
    }

    triggerThreatEffect() {
        const tiles = this._game.tileService.tilesAroundCamp;
        this._game.tileService.markTileResourcesForAction(tiles,
            TILE_RESOURCE_ACTION.DEPLETE,
            this._name,
            null,
            2,
            true
        );
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
