import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../../interfaces/InventionService/Invention";
import {TILE_ACTION} from "../../../../../interfaces/TileService/ITile";

export class Earthquake extends EventCard implements IEventCard {
    protected readonly _namePL = "trzęsienie ziemi";
    protected readonly _resolutionPL = "budowa przejścia";

    constructor(game: IGame) {
        super(
            EVENT_CARD.EARTHQUAKE,
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
        const tiles = this._game.tileService.tilesAroundCamp;
        if (this._game.tileService.countHowManyTilesCanBeMarkedForAction(tiles, TILE_ACTION.FLIP) > 0) {
            this._game.tileService.markTilesForAction(tiles, TILE_ACTION.FLIP, 1, this._namePL);
        }

    }

    triggerThreatEffect() {
        // tile becomes permanently unavailable
    }

    fullFill() {
        const tile = this._game.tileService.tiles.find((t) => t.modifiers.flipped === this._namePL);
        if (tile) {
            tile.unsetTileModifier("flipped", this._resolutionPL);
        }
    }
}
