import {Ability} from "../Ability/Ability";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

import {IAbility} from "@shared/types/Game/Skill/IAbility";


export class Reconnaissance extends Ability implements IAbility<null> {
    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.RECONNAISSANCE,
            "all",
            null,
            2, game,
            character);
    }


    use() {
        const tileTypes = this._game.tileService.pickTileTypesFromStack(3);
        this._game.startPickingObject(tileTypes,
            this._character as IPlayerCharacter,
            1,
            this._name,
            "tileType",
            (tileType) => {
                this._game.tileService.switchOrderInTileStack(tileType, "top");
            })
        super.use(null);
    }
}
