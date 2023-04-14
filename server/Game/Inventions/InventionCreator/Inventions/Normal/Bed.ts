import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {TERRAIN_TYPE} from "../../../../../../interfaces/TileService/ITile";

export class Bed extends Invention implements IInvention {
    protected readonly _namePL = "łóżko";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.BED,
            {terrainType: TERRAIN_TYPE.PLAINS, inventions: null},
            INVENTION_TYPE.NORMAL,
            game
        );
    }

    onBuild() {
        this._game.arrangeCampRestService.bed = true;
    }

    onDestruction() {
        this._game.arrangeCampRestService.bed = false;
    }
}
