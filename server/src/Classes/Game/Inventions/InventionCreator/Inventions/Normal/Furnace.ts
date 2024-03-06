import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";

export class Furnace extends Invention implements IInvention {
    protected readonly _namePL = "piec";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.FURNACE,
            {terrainType: null, inventions: [INVENTION_STARTER.BRICKS]},
            INVENTION_TYPE.NORMAL,
            game
        );
    }

    onBuild() {
    }

    onDestruction() {
    }
}
