import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {TERRAIN_TYPE} from "../../../../../../interfaces/TileService/ITile";
import {PAWN_HELPER_ACTION} from "../../../../../../interfaces/Pawns/Pawn";
import {Invention} from "../../Invention";

export class Map extends Invention implements IInvention {
    protected readonly _namePL = "mapa";

    constructor(game: IGame) {
        super(
            INVENTION_STARTER.MAP,
            {terrainType: TERRAIN_TYPE.RIVER, inventions: null},
            INVENTION_TYPE.STARTER,
            game,
        );
    }

    onBuild() {
        this._pawnService.initPawns(1, false, PAWN_HELPER_ACTION.EXPLORE);
    }

    onDestruction() {
        this._pawnService.destroyAllPawns();
        super.onDestruction();
    }
}
