import {Invention} from "../../Invention";
import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TERRAIN_TYPE} from "@shared/types/Game/TileService/ITile";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Pot extends Invention implements IInvention {
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
