import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {Invention} from "../../Invention";
import {PAWN_HELPER_ACTION} from "@shared/types/Game/Pawns/Pawn";

export class Raft extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.RAFT,
            {terrainType: null, inventions: [INVENTION_STARTER.ROPE]},
            INVENTION_TYPE.NORMAL,
            game,
            {type: "wood", amount: 2}
        );
    }

    onBuild() {
        this._pawnService.initPawns(1, false, PAWN_HELPER_ACTION.GATHER_EXPLORE);
    }

    onDestruction() {
        this._pawnService.pawns.forEach((pawn) => this._pawnService.destroyPawn(pawn.draggableId))
    }
}
