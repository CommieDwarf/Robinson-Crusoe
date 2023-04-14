import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {TERRAIN_TYPE} from "../../../../../../interfaces/TileService/ITile";
import {HelperPawnInvention} from "../../HelperPawnInvention";
import {PAWN_HELPER_ACTION} from "../../../../../../interfaces/Pawns/Pawn";

export class Lantern extends HelperPawnInvention implements IInvention {
    protected readonly _namePL = "latarnia";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.LANTERN,
            {terrainType: TERRAIN_TYPE.HILLS, inventions: [INVENTION_STARTER.FIRE]},
            INVENTION_TYPE.NORMAL,
            game,
            PAWN_HELPER_ACTION.BUILD
        );
    }

    onBuild() {
        super.onBuild();
    }

    onDestruction() {
        super.onDestruction();
    }
}
