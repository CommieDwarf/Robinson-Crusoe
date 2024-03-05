import {Skill} from "../Skill/Skill";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";
import {IGame} from "../../../../../types/Game";
import {scrounger} from "../../../../../../constants/SkillDescriptions/Cook";
import {PHASE} from "../../../../../types/PhaseService/Phase";
import {ISkill} from "../../../../../types/Skill/Skill";
import {ACTION} from "../../../../../types/ACTION";
import {ActionDice} from "../../../../../types/RollDice/RollDice";

export class Scrounger extends Skill implements ISkill<ActionDice> {

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            scrounger.name,
            scrounger.namePL,
            scrounger.description,
            scrounger.quote,
            [PHASE.ACTION],
            ACTION.GATHER,
            2,
            game,
            character
        );
    }

    use(target: ActionDice) {
        if (this._game.actionService.action !== ACTION.GATHER) {
            this._game.alertService.setAlert(
                "Tej umiejętności można użyć tylko na kostkach zbierania"
            );
        }

        if (this._game.actionService.lastRolledItem) {
            this._game.actionService.lastRolledItem.reRollDice(target, ACTION.GATHER);
            super.use(target);
        }
    }
}
