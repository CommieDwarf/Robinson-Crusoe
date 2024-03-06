import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {PAWN_HELPER_ACTION} from "@shared/types/Game/Pawns/Pawn";
import {Invention} from "../../Invention";

export class Belts extends Invention implements IInvention {
    protected readonly _namePL = "pasy";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.BELTS,
            {terrainType: null, inventions: [INVENTION_STARTER.KNIFE]},
            INVENTION_TYPE.NORMAL,
            game,
            {type: "leather", amount: 1}
        );
    }

    onBuild() {
        this._pawnService.initPawns(1, false, PAWN_HELPER_ACTION.GATHER)
    }

    onDestruction() {
        this._pawnService.destroyAllPawns();
        super.onDestruction();
    }
}
