import {Ability} from "../Ability/Ability";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class EconomicalConstruction extends Ability implements IAbility<any> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.ECONOMICAL_CONSTRUCTION,
            "all",
            null,
            2,
            game,
            character);
    }

    use() {
        super.use(null);
        (this._character as IPlayerCharacter).setPersonalResource("wood", true);
    }
}
