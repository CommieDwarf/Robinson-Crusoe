import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TERRAIN_TYPE} from "@shared/types/Game/TileService/ITile";
import {Invention} from "../../Invention";

export class Lantern extends Invention implements IInvention {
    protected readonly _namePL = "latarnia";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.LANTERN,
            {terrainType: TERRAIN_TYPE.HILLS, inventions: [INVENTION_STARTER.FIRE]},
            INVENTION_TYPE.NORMAL,
            game,
        );
    }

    onBuild() {
    }

    onDestruction() {
        this._pawnService?.pawns.map((pawn) => this._pawnService?.destroyPawn(pawn.draggableId))
    }
}
