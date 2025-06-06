import {Invention} from "../../Invention";
import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TERRAIN_TYPE} from "@shared/types/Game/TileService/ITile";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";

export class Knife extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_STARTER.KNIFE,
            {terrainType: TERRAIN_TYPE.MOUNTAINS, inventions: null},
            INVENTION_TYPE.STARTER,
            game
        );
    }

    onBuild() {
        super.onBuild()
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.WEAPON,
            1,
            this._logSource
        );
    }

    onDestruction() {
        super.onDestruction();
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.WEAPON,
            1,
            this._logSource
        );
    }
}
