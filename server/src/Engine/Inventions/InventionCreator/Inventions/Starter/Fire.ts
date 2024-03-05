import {Invention} from "../../Invention";
import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "../../../../../types/InventionService/Invention";
import {IGame} from "../../../../../types/Game";
import {TERRAIN_TYPE} from "../../../../../types/TileService/ITile";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";

export class Fire extends Invention implements IInvention {
    protected readonly _namePL = "ogień";

    constructor(game: IGame) {
        super(
            INVENTION_STARTER.FIRE,
            {terrainType: TERRAIN_TYPE.MOUNTAINS, inventions: null},
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
