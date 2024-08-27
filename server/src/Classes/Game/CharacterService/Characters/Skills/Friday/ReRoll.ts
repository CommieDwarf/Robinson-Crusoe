import {Ability} from "../Ability/Ability";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {ISideCharacter} from "@shared/types/Game/Characters/SideCharacter";
import {ACTION} from "@shared/types/Game/ACTION";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {IGame} from "@shared/types/Game/Game";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export class ReRoll extends Ability implements IAbility<ActionDice> {

    declare _character: ISideCharacter

    constructor(game: IGame, character: ISideCharacter) {
        super(
            ABILITY.FRIDAYS_ABILITY,
            [PHASE.ACTION],
            null,
            2,
            game,
            character
        );
    }

    use(target: ActionDice) {
        if (!target) {
            throw new Error("This ability requires target");
        }
        if (this._game.actionService.lastRolledItem) {
            super.use(target);
            this._game.actionService.reRollDice(target);
        }
    }
}
