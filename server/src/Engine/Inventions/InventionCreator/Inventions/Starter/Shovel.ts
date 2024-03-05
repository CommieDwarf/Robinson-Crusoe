import {Invention} from "../../Invention";
import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "../../../../../types/InventionService/Invention";
import {IGame} from "../../../../../types/Game";
import {TERRAIN_TYPE} from "../../../../../types/TileService/ITile";

export class Shovel extends Invention implements IInvention {
    protected readonly _namePL = "łopata";

    constructor(game: IGame) {
        super(
            INVENTION_STARTER.SHOVEL,
            {terrainType: TERRAIN_TYPE.BEACH, inventions: null},
            INVENTION_TYPE.STARTER,
            game
        );
    }

    onBuild() {
        return;
    }

    onDestruction() {
        return;
    }
}
