import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../types/InventionService/Invention";
import {IGame} from "../../../../../types/Game";

export class Cellar extends Invention implements IInvention {
    protected readonly _namePL = "piwnica";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.CELLAR,
            {terrainType: null, inventions: [INVENTION_STARTER.SHOVEL]},
            INVENTION_TYPE.NORMAL,
            game
        );
    }

    onBuild() {
    }

    onDestruction() {
    }
}
