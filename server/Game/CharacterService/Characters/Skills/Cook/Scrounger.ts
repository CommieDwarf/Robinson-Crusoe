import {Skill} from "../Skill/Skill";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {IGame} from "../../../../../../interfaces/Game";
import {scrounger} from "../../../../../../constants/SkillDescriptions/Cook";
import {PHASE} from "../../../../../../interfaces/PhaseService/Phase";
import {ISkill} from "../../../../../../interfaces/Skill/Skill";
import {ACTION} from "../../../../../../interfaces/ACTION";
import {ActionDice} from "../../../../../../interfaces/RollDice/RollDice";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";
import {Cloud} from "../../../../../../interfaces/Weather/Weather";

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
