import {Skill} from "../Skill/Skill";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {ISideCharacter} from "@shared/types/Game/Characters/SideCharacter";
import {ACTION} from "@shared/types/Game/ACTION";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {ISkill} from "@shared/types/Game/Skill/Skill";
import {IGame} from "@shared/types/Game/Game";

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
