import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../types/InventionService/Invention";
import {IGame} from "../../../../../types/Game";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";

export class Moat extends Invention implements IInvention {
    protected readonly _namePL = "ogrodzenie";

    constructor(game: IGame) {
        super(
            INVENTION_NORMAL.MOAT,
            {terrainType: null, inventions: [INVENTION_STARTER.SHOVEL]},
            INVENTION_TYPE.NORMAL,
            game,
            {type: "wood", amount: 1}
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
