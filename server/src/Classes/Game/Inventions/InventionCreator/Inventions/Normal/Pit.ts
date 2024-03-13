import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";

export class Pit extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.PIT,
            {
                terrainType: null,
                inventions: [INVENTION_STARTER.SHOVEL],
            },
            INVENTION_TYPE.NORMAL,
            game,
            {type: "wood", amount: 1}
        );
    }

    onBuild() {
        this._game.resourceService.pit = true;
    }

    onDestruction() {
        this._game.resourceService.pit = false;
    }
}
