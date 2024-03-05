import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../types/InventionService/Invention";
import {IGame} from "../../../../../types/Game";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";

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
