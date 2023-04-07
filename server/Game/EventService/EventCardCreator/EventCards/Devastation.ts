import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../../interfaces/Game";
import {EVENT_CARD} from "../../../../../interfaces/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../../interfaces/InventionService/Invention";
import {TILE_RESOURCE_ACTION} from "../../../../../interfaces/TileService/TileResourceService";

export class Devastation extends EventCard implements IEventCard {
    protected readonly _namePL = "niszczycielskie podmuchy";
    protected readonly _resolutionPL = "nowe ścieżki";

    constructor(game: IGame) {
        super(
            EVENT_CARD.DEVASTATION,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        const tiles = this._game.tileService.tilesAroundCamp;
        this._game.tileService.markResourceTilesForActionOrGetHurt(tiles, TILE_RESOURCE_ACTION.DEPLETE, 2, this._namePL, null);
    }

    triggerThreatEffect() {
        const tiles = this._game.tileService.tilesAroundCamp;
        this._game.tileService.markResourceTilesForActionOrGetHurt(tiles, TILE_RESOURCE_ACTION.DEPLETE, 1, this._namePL, null)
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
