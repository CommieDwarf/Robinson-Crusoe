import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";

export class Wall extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.WALL,
            {terrainType: null, inventions: [INVENTION_STARTER.BRICKS]},
            INVENTION_TYPE.NORMAL,
            game
        );
    }

    onBuild() {
        super.onBuild();
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.PALISADE,
            2,
            this._logSource
        );
    }

    onDestruction() {
        super.onDestruction();
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.PALISADE,
            2,
            this._logSource
        );
    }
}
