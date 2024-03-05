import {Invention} from "../../Invention";
import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "../../../../../types/InventionService/Invention";
import {IGame} from "../../../../../types/Game";
import {TERRAIN_TYPE} from "../../../../../types/TileService/ITile";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";

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
