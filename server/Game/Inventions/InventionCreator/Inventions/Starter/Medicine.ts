import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {TERRAIN_TYPE} from "../../../../../../interfaces/TileService/ITile";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Medicine extends Invention implements IInvention {
    protected readonly _namePL = "lek";

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
