import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {HelperPawnInvention} from "../../HelperPawnInvention";
import {PAWN_HELPER_ACTION} from "../../../../../../interfaces/Pawns/Pawn";
import {SingleResourceRequirement} from "../../../../../../interfaces/ResourceCommitableItem/ResourceCommittableItem";

export class Belts extends HelperPawnInvention implements IInvention {
    protected readonly _namePL = "pasy";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.BELTS,
            {terrainType: null, inventions: [INVENTION_STARTER.KNIFE]},
            INVENTION_TYPE.NORMAL,
            game,
            PAWN_HELPER_ACTION.GATHER,
            {type: "leather", amount: 1}
        );
    }

    onBuild() {
        super.onBuild();
    }

    onDestruction() {
        super.onDestruction();
    }
}
