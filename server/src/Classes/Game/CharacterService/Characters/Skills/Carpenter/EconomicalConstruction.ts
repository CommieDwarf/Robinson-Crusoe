import {Ability} from "../Ability/Ability";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class EconomicalConstruction extends Ability implements IAbility<any> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.ECONOMICAL_CONSTRUCTION,
            "",
            "",
            [PHASE.ACTION],
            null,
            2,
            game,
            character);
    }

    use() {
        // super.use();
        //TODO: implement
    }
}
