import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../types/InventionService/Invention";
import {IGame} from "../../../../../types/Game";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";

export class Wall extends Invention implements IInvention {
    protected readonly _namePL = "mur";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.WALL,
            {terrainType: null, inventions: [INVENTION_STARTER.BRICKS]},
            INVENTION_TYPE.NORMAL,
            game
        );
    }

    onBuild() {
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.PALISADE,
            2,
            this._logSource
        );
    }

    onDestruction() {
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.PALISADE,
            2,
            this._logSource
        );
    }
}
