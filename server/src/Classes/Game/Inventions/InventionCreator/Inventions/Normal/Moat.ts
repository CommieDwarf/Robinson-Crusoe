import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_NORMAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";

export class Moat extends Invention implements IInvention {

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
        super.onBuild()
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.PALISADE,
            2,
            this._logSource
        );
    }

    onDestruction() {
        super.onDestruction();
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.PALISADE,
            2,
            this._logSource
        );
    }
}
