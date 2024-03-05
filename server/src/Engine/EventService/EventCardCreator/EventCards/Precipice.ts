import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {ACTION} from "../../../../types/ACTION";
import {TILE_ACTION} from "../../../../types/TileService/ITile";

export class Precipice extends EventCard implements IEventCard {
    protected readonly _namePL = "przepaść";
    protected readonly _resolutionPL = "budowa mostu";

    constructor(game: IGame) {
        super(
            EVENT_CARD.PRECIPICE,
            ACTION.EXPLORE,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: "wood",
                optionalResource: "wood",

            },
            game
        );
    }

    triggerEventEffect() {
        const tiles = this._game.tileService.tilesAroundCamp;
        this._game.tileService.markTilesForAction(tiles, TILE_ACTION.FLIP, 1, this._namePL);
        //TODO: if possible make tile next to camp unavailable
    }

    triggerThreatEffect() {
        //tile stays unavailable
    }

    fullFill() {
        const tile = this._game.tileService.tiles.find((tile) => tile.modifiers.flipped?.source === this._namePL);
        if (tile) {
            tile.unsetTileModifier("flipped", this._resolutionPL);
        }
        this.incrDetermination(3);
    }
}
