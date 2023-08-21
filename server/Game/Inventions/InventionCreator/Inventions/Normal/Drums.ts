import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {TERRAIN_TYPE} from "../../../../../../interfaces/TileService/ITile";
import {BasicResources} from "../../../../ResourceService/BasicResources";

export class Drums extends Invention implements IInvention {
    protected readonly _namePL = "bębny";

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
