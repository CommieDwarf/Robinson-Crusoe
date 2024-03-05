import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../../interfaces/Game";
import {TERRAIN_TYPE} from "../../../../../../../interfaces/TileService/ITile";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class Pot extends Invention implements IInvention {
    protected readonly _namePL = "naczynia";
    protected _usable = true;
    

    constructor(game: IGame) {
        super(
            INVENTION_STARTER.POT,
            {terrainType: TERRAIN_TYPE.HILLS, inventions: null},
            INVENTION_TYPE.STARTER,
            game
        );
    }

    use(user: IPlayerCharacter) {
        if (this._game.phaseService.phase === "night") {
            if (this._game.resourceService.canAffordResource("food", 1)) {
                this._game.resourceService.spendBasicResourceIfPossible("food", 1, "");
                this._game.characterService.heal(user, 1, this._namePL);
            }
        }
    }

    onBuild() {
        return;
    }

    onDestruction() {
        return;
    }
}
