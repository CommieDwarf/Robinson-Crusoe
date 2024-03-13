import {Invention} from "../../Invention";
import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TERRAIN_TYPE} from "@shared/types/Game/TileService/ITile";

export class Medicine extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_STARTER.MEDICINE,
            {terrainType: TERRAIN_TYPE.PLAINS, inventions: null},
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
