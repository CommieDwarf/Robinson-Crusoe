import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {TERRAIN_TYPE, TILE_ACTION} from "../../../../types/TileService/ITile";

export class SmokeOnTheHorizon extends EventCard implements IEventCard {
    protected readonly _namePL = "dym na horyzoncie";
    protected readonly _resolutionPL = "gaszenie ognia";

    constructor(game: IGame) {
        super(
            EVENT_CARD.SMOKE_ON_THE_HORIZON,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        const tiles = this._game.tileService.tiles.filter((tile) => tile.tileResourceService?.terrainType === TERRAIN_TYPE.PLAINS);
        this._game.tileService.markTilesForAction(tiles, TILE_ACTION.DEPLETE_TERRAIN_TYPE, 1, this._namePL);
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
    }

    fullFill() {
        const tile = this._game.tileService.tiles.find((tile) => tile.modifiers.terrainDepleted?.source === this._namePL);
        if (tile) {
            tile.unsetTileModifier("terrainDepleted", this._resolutionPL);
        }
        this.incrDetermination(1);
    }
}
