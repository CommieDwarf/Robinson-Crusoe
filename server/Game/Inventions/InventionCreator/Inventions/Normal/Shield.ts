import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {Invention} from "../../Invention";
import {PAWN_HELPER_ACTION} from "../../../../../../interfaces/Pawns/Pawn";

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
        this.initHelperPawn(PAWN_HELPER_ACTION.HUNT);
    }

    onDestruction() {
        this.destroyPawn();
    }
}
