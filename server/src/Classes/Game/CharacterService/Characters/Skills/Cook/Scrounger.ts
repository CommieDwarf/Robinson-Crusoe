import {Skill} from "../Skill/Skill";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGame} from "@shared/types/Game/Game";
import {PHASE} from "@shared/types/Game/PhaseService/Phase";
import {ISkill} from "@shared/types/Game/Skill/Skill";
import {ACTION} from "@shared/types/Game/ACTION";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {scrounger} from "@shared/constants/SkillDescriptions/Cook";

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
