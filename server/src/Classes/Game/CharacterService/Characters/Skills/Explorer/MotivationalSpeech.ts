import {Ability} from "../Ability/Ability";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {IAbility} from "@shared/types/Game/Skill/IAbility";


export class MotivationalSpeech extends Ability implements IAbility<null> {
    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.MOTIVATIONAL_SPEECH, "all", null, 2, game, character);
    }


    use() {
        this._game.moraleService.lvlUp(1, this._name);
        super.use(null);
    }
}
