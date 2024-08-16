import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TILE_RESOURCE_ACTION} from "@shared/types/Game/TileService/TileResourceService";
import {ITile} from "@shared/types/Game/TileService/ITile";

export class Corral extends Invention implements IInvention {
    private _tiles: ITile[] | null = null;

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.CORRAL,
            {terrainType: null, inventions: [INVENTION_STARTER.ROPE]},
            INVENTION_TYPE.NORMAL,
            game,
            {type: "wood", amount: 1}
        );
    }

    use() {
        const tiles = this._game.tileService.tilesAroundCamp;
        this._tiles = tiles;
        const canUse = tiles.some((tile) => tile.hasBasicResource("food"));

        if (canUse) {
            // this._game.tileService.markTileResourcesForAction(tiles, TILE_RESOURCE_ACTION.ADD_MODIFIER, this._namePL, "food");
            this._used = true;
        }
    }


    onDestruction() {
        super.onDestruction();
        if (this._tiles) {
            this._tiles.forEach((tile) => {
                tile.removeResourceModifier(null, "food", this._namePL)
            })
        }
    }
}
