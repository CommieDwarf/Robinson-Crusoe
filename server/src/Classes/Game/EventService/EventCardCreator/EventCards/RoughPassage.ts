import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {TILE_ACTION} from "@shared/types/Game/TileService/ITile";

export class RoughPassage extends EventCard implements IEventCard {
    protected readonly _namePL = "wyboiste przejście";
    protected readonly _resolutionPL = "wytyczanie nowej ścieżki";

    constructor(game: IGame) {
        super(
            EVENT_CARD.ROUGH_PASSAGE,
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
        const tiles = this._game.tileService.tiles.filter((tile) => tile.tileResourceService?.terrainType === "hills");
        if (tiles.length > 0) {
            this._game.tileService.markTilesForAction(tiles, TILE_ACTION.DEPLETE_TERRAIN_TYPE, 1, this._name, false);
        }
    }

    triggerThreatEffect() {
        this.triggerEventEffect();
    }

    fullFill() {
        const tile = this._game.tileService.tiles.find((tile) => tile.modifiers.terrainDepleted?.source === this._name);
        if (tile) {
            tile.unsetTileModifier("flipped", this._resolutionPL);
        }
        this.incrDetermination(1);
    }
}
