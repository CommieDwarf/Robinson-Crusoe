import {Ability} from "../Skill/Ability";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";


export class MotivationalSpeech extends Ability {
    constructor(game: IGame, character: IPlayerCharacter) {
        super(ABILITY.MOTIVATIONAL_SPEECH, "description", "quote", "all", null, 2, game, character);
    }


    use(target: ActionDice) {
        this._game.moraleService.lvlUp(1, this._name);
        super.use(target);
    }
}
