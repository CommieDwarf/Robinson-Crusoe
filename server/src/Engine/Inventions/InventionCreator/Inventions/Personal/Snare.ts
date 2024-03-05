import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../types/InventionService/Invention";
import {IGame} from "../../../../../types/Game";

export class Snare extends Invention implements IInvention {
    protected _usable = true;
    protected readonly _namePL = "wnyki";

    constructor(game: IGame) {
        super(
            INVENTION_PERSONAL.SNARE,
            {terrainType: null, inventions: [INVENTION_STARTER.ROPE]},
            INVENTION_TYPE.PERSONAL,
            game
        );
    }

    use() {
        //TODO: implement
    }

    onDestruction() {
        //TODO: implement
    }
}
