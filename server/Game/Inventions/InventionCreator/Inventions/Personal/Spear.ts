import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {BasicResources} from "../../../../ResourceService/BasicResources";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";

export class Spear extends Invention implements IInvention {
    protected readonly _namePL = "dzida";

    constructor(game: IGame) {
        super(
            INVENTION_PERSONAL.SPEAR,
            {terrainType: null, inventions: [INVENTION_STARTER.KNIFE]},
            INVENTION_TYPE.NORMAL,
            game,
            {type: "wood", amount: 1}
        );
    }

    onBuild() {
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.WEAPON,
            3,
            this._logSource
        );
    }

    onDestruction() {
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.WEAPON,
            3,
            this._logSource
        );
    }
}
