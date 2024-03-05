import {Skill} from "../Skill/Skill";
import {ISkill} from "../../../../../types/Skill/Skill";
import {IGame} from "../../../../../types/Game";
import {PHASE} from "../../../../../types/PhaseService/Phase";
import {ISideCharacter} from "../../../../../types/Characters/SideCharacter";
import {ACTION} from "../../../../../types/ACTION";
import {ActionDice} from "../../../../../types/RollDice/RollDice";

export class ReRoll extends Skill implements ISkill<ActionDice> {

    declare _character: ISideCharacter

    constructor(game: IGame, character: ISideCharacter) {
        super(
            "reRoll",
            "Przerzut dowolnej kości akcji",
            "",
            "",
            [PHASE.ACTION],
            null,
            2,
            game,
            character
        );
    }

    use(target: ActionDice) {
        if (this._game.actionService.lastRolledItem) {
            this._game.actionService.lastRolledItem.reRollDice(target, ACTION.GATHER);
            super.use(target);
        }
    }
}
