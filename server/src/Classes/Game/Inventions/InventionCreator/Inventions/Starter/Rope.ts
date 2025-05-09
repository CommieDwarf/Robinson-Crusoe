import {Invention} from "../../Invention";
import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TERRAIN_TYPE} from "@shared/types/Game/TileService/ITile";

export class Rope extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_STARTER.ROPE,
            {terrainType: TERRAIN_TYPE.PLAINS, inventions: null},
            INVENTION_TYPE.STARTER,
            game
        );
    }

}
