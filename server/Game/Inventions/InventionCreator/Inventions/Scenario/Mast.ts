import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_CASTAWAYS,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {BasicResources} from "../../../../ResourceService/BasicResources";

export class Mast extends Invention implements IInvention {
    protected readonly _namePL = "maszt";

    constructor(game: IGame) {
        super(
            INVENTION_CASTAWAYS.MAST,
            {terrainType: null, inventions: [INVENTION_STARTER.ROPE]},
            INVENTION_TYPE.SCENARIO,
            game,
            {type: "wood", amount: 1}
        );
    }

    onBuild() {
        this._game.scenarioService.onItemUse(3, this._namePL);
    }

    onDestruction() {
        return;
    }
}
