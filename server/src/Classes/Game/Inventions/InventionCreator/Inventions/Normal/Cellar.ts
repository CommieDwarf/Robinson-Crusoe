import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";

export class Cellar extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.CELLAR,
            {terrainType: null, inventions: [INVENTION_STARTER.SHOVEL]},
            INVENTION_TYPE.NORMAL,
            game
        );
    }

}
