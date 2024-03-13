import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";

export class Shortcut extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_PERSONAL.SHORTCUT,
            {terrainType: null, inventions: [INVENTION_STARTER.MAP]},
            INVENTION_TYPE.PERSONAL,
            game
        );
    }

    use() {
        // TODO : implement
    }

    onDestruction() {
        // TODO: implement
    }
}
