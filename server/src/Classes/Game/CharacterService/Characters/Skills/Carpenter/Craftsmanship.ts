import {Ability} from "../Ability/Ability";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {ACTION} from "@shared/types/Game/ACTION";

export class Craftsmanship extends Ability implements IAbility<any> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.CRAFTSMANSHIP,
            [PHASE.ACTION],
            ACTION.BUILD,
            2,
            game,
            character);
    }

    use() {
        super.use(null);
    }
}
