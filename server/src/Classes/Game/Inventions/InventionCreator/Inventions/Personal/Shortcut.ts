import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TILE_RESOURCE_ACTION} from "@shared/types/Game/TileService/TileResourceService";
import { CHARACTER } from "@shared/types/Game/Characters/Character";

export class Shortcut extends Invention implements IInvention {

    protected _belongsTo: CHARACTER | null = CHARACTER.EXPLORER;

    constructor(game: IGame) {
        super(
            INVENTION_PERSONAL.SHORTCUT,
            {terrainType: null, inventions: [INVENTION_STARTER.MAP]},
            INVENTION_TYPE.PERSONAL,
            game
        );
    }

    get canBeUsed() {
        return this._game.tileService.tilesAroundCamp.filter((tile) => tile.isExplored).length > 0 && !this._used;
    }

    use() {
        const tileService = this._game.tileService;
        const tiles = tileService.tilesAroundCamp.filter((tile) => tile.isExplored);
        tileService.markTileResourcesForAction(
            tiles,
            TILE_RESOURCE_ACTION.SET_SHORTCUT,
            this._name,
            null,
            1,
            false
        );
        this._used = true;
    }

    onDestruction() {
        super.onDestruction()
        const tile = this._game.tileService.tiles.find((tile) => tile.hasShortcut);
        if (tile) {
            tile.unsetShortcut();
        }
        this._used = false;
    }
}
