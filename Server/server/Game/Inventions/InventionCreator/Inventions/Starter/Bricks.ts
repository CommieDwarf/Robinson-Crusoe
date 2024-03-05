import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../../interfaces/Game";
import {TERRAIN_TYPE} from "../../../../../../../interfaces/TileService/ITile";
import {CONSTRUCTION} from "../../../../../../../interfaces/ConstructionService/Construction";

export class Bricks extends Invention implements IInvention {
    protected readonly _namePL = "cegły";

    constructor(game: IGame) {
        super(
            INVENTION_STARTER.BRICKS,
            {terrainType: TERRAIN_TYPE.HILLS, inventions: null},
            INVENTION_TYPE.STARTER,
            game
        );
    }

    onBuild() {
            this._game.constructionService.lvlUpConstruction(
                CONSTRUCTION.PALISADE,
                1,
                this._logSource
            );
    }

    onDestruction() {
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.PALISADE,
            1,
            this._logSource
        );
    }
}
