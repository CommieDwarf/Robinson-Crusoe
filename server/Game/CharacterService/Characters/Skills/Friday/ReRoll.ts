import {Skill} from "../Skill/Skill";
import {ISkill, SkillTarget} from "../../../../../../interfaces/Skill/Skill";
import {IGame} from "../../../../../../interfaces/Game";
import {PHASE} from "../../../../../../interfaces/PhaseService/Phase";
import {ISideCharacter} from "../../../../../../interfaces/Characters/SideCharacter";
import {ACTION} from "../../../../../../interfaces/ACTION";
import {ActionDice} from "../../../../../../interfaces/RollDice/RollDice";

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
