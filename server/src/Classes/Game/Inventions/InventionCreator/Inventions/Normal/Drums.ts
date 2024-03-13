import {Invention} from "../../Invention";
import {IInvention, INVENTION_NORMAL, INVENTION_TYPE,} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TERRAIN_TYPE} from "@shared/types/Game/TileService/ITile";

export class Drums extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.DRUMS,
            {terrainType: TERRAIN_TYPE.HILLS, inventions: null},
            INVENTION_TYPE.NORMAL,
            game,
            {type: "leather", amount: 1}
        );
    }

    onBuild() {
    }

    onDestruction() {
    }
}
