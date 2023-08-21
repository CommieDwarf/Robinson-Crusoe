import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {PAWN_HELPER_ACTION} from "../../../../../../interfaces/Pawns/Pawn";
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
        this.initHelperPawn(PAWN_HELPER_ACTION.GATHER);
    }

    onDestruction() {
        this.destroyPawn();
    }
}
