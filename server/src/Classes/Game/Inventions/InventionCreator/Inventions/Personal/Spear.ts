import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";

export class Spear extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_PERSONAL.SPEAR,
            {terrainType: null, inventions: [INVENTION_STARTER.KNIFE]},
            INVENTION_TYPE.PERSONAL,
            game,
            {type: "wood", amount: 1}
        );
    }

    onBuild() {
        super.onBuild();
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.WEAPON,
            3,
            this._name
        );
    }

    onDestruction() {
        super.onDestruction();
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.WEAPON,
            3,
            this._name
        );
    }
}
