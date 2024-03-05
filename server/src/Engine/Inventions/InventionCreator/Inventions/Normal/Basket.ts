import {Invention} from "../../Invention";
import {IInvention, INVENTION_NORMAL, INVENTION_TYPE,} from "../../../../../types/InventionService/Invention";
import {IGame} from "../../../../../types/Game";
import {TERRAIN_TYPE} from "../../../../../types/TileService/ITile";

export class Basket extends Invention implements IInvention {
    protected readonly _namePL = "kosz";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.BASKET,
            {terrainType: TERRAIN_TYPE.PLAINS, inventions: null},
            INVENTION_TYPE.NORMAL,
            game,
        );
    }

    onBuild() {
    }

    onDestruction() {
    }
}
