import {Ability} from "../Ability/Ability";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {ACTION} from "@shared/types/Game/ACTION";

export class Frenzy extends Ability implements IAbility<null> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            ABILITY.FRENZY,
            "all",
            null,
            3,
            game,
            character
        );
    }

    use() {
        super.use(null);
        (this._character as IPlayerCharacter).weaponBoost += 3;
    }

}
