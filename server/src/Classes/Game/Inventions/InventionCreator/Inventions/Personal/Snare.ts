import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TILE_RESOURCE_ACTION} from "@shared/types/Game/TileService/TileResourceService";
import {ITile} from "@shared/types/Game/TileService/ITile";

export class Snare extends Invention implements IInvention {
    private _tile: ITile | null = null;

    constructor(game: IGame) {
        super(
            INVENTION_PERSONAL.SNARE,
            {terrainType: null, inventions: [INVENTION_STARTER.ROPE]},
            INVENTION_TYPE.PERSONAL,
            game
        );
    }

    get canBeUsed() {
        return !this._used
    }

    use() {
        const tile = this._game.tileService.campTile;
        this._game.tileService.markTileResourcesForAction(
            [tile],
            TILE_RESOURCE_ACTION.ADD_MODIFIER,
            this._name,
            null,
            1,
            false
        )
        this._tile = tile;
        this._used = true;
    }

    onDestruction() {
        super.onDestruction();
        this._tile?.getSideByResource("food");
        this._tile?.removeResourceModifier(null, "food", this.name);
        this._used = false;
    }
}
