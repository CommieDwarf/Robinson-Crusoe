import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../../interfaces/InventionService/Invention";
import {TERRAIN_TYPE, TILE_ACTION} from "../../../../../interfaces/TileService/ITile";

export class Drought extends EventCard implements IEventCard {
    protected readonly _namePL = "susza";
    protected readonly _resolutionPL = "nowe koryto";

    constructor(game: IGame) {
        super(
            EVENT_CARD.DROUGHT,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        //TODO: if possible cover river terrain on some tile.
        //TODO: treat as unexplored terrain.
        const tiles = this._game.tileService.tiles.filter((tile) => tile.tileResourceService?.terrainType === TERRAIN_TYPE.RIVER);
        if (tiles.length > 0) {
            this._game.tileService.markTilesForAction(tiles, TILE_ACTION.DEPLETE_TERRAIN_TYPE, 1, this._namePL);
        }
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
    }

    fullFill() {
        const tile = this._game.tileService.tiles.find((tile) => tile.modifiers.terrainDepleted === this._namePL);
        if (tile) {
            tile.unsetTileModifier("terrainDepleted", this._resolutionPL);
        }
        this.incrDetermination(1);
    }
}
