import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {Invention} from "../../Invention";
import {PAWN_HELPER_ACTION} from "@shared/types/Game/Pawns/Pawn";

export class Shield extends Invention implements IInvention {
    protected readonly _namePL = "tarcza";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.SHIELD,
            {terrainType: null, inventions: [INVENTION_STARTER.ROPE]},
            INVENTION_TYPE.NORMAL,
            game,
            {type: "wood", amount: 1}
        );
    }

    onBuild() {
        this._pawnService.initPawns(1, false, PAWN_HELPER_ACTION.HUNT);
    }

    onDestruction() {
        this._pawnService.destroyAllPawns()
    }
}
