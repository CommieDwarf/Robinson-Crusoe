import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {TILE_RESOURCE_ACTION} from "../../../../../../interfaces/TileService/TileResourceService";
import {ITile} from "../../../../../../interfaces/TileService/ITile";

export class Corral extends Invention implements IInvention {
    protected _usable = true;
    protected readonly _namePL = "zagroda";
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
            console.log("CAN USE")
            this._game.tileService.markTileResourcesForAction(tiles, TILE_RESOURCE_ACTION.ADD_MODIFIER, this._namePL, "food");
            this._used = true;
        }
    }

    onBuild() {

    }

    onDestruction() {
        if (this._tiles) {
            this._tiles.forEach((tile) => {
                tile.removeResourceModifier(null, "food", this._namePL)
            })
        }
    }
}
