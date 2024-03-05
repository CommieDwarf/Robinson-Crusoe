import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_TYPE,
} from "../../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../../interfaces/Game";
import {BasicResources} from "../../../../ResourceService/BasicResources";
import {CONSTRUCTION} from "../../../../../../../interfaces/ConstructionService/Construction";

export class Sling extends Invention implements IInvention {
    protected _resourceChoice = true;
    protected readonly _namePL = "proca";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.SLING,
            {terrainType: null, inventions: null},
            INVENTION_TYPE.NORMAL,
            game,
            {type: "wood", amount: 1},
            {type: "leather", amount: 1}
        );
    }

    onBuild() {
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.WEAPON,
            2,
            this._logSource
        );
    }

    onDestruction() {
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.WEAPON,
            2,
            this._logSource
        );
    }
}
