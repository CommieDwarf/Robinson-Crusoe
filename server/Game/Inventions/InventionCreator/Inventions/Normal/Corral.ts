import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {BasicResources} from "../../../../ResourceService/BasicResources";

export class Corral extends Invention implements IInvention {
    protected readonly _namePL = "zagroda";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.CORRAL,
            {terrainType: null, inventions: [INVENTION_STARTER.ROPE]},
            INVENTION_TYPE.NORMAL,
            game,
            {type: "wood", amount: 1}
        );
    }

    onBuild() {
        //TODO: implement
    }

    onDestruction() {
        //TODO: implement
    }
}
