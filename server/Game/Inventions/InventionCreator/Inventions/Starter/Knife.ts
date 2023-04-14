import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {TERRAIN_TYPE} from "../../../../../../interfaces/TileService/ITile";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";

export class Knife extends Invention implements IInvention {
    protected readonly _namePL = "nóż";

    constructor(game: IGame) {
        super(
            INVENTION_STARTER.KNIFE,
            {terrainType: TERRAIN_TYPE.MOUNTAINS, inventions: null},
            INVENTION_TYPE.STARTER,
            game
        );
    }

    onBuild() {
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.WEAPON,
            1,
            this._logSource
        );
    }

    onDestruction() {
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.WEAPON,
            1,
            this._logSource
        );
    }
}
