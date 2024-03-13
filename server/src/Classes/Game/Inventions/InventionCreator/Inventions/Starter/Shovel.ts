import {Invention} from "../../Invention";
import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TERRAIN_TYPE} from "@shared/types/Game/TileService/ITile";

export class Shovel extends Invention implements IInvention {

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
