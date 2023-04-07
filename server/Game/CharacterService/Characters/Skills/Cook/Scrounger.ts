import {Skill} from "../Skill/Skill";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {IGame} from "../../../../../../interfaces/Game";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";
import {scrounger} from "../../../../../../constants/SkillDescriptions/Cook";
import {PHASE} from "../../../../../../interfaces/PhaseService/Phase";
import {ISkill} from "../../../../../../interfaces/Skill/Skill";
import {ACTION} from "../../../../../../interfaces/ACTION";
import {ActionDice} from "../../../../../../interfaces/RollDice/RollDice";

export class Scrounger extends Skill implements ISkill {
    private _character: IPlayerCharacter;

    constructor(game: IGame, character: IPlayerCharacter) {
        super(
            scrounger.name,
            scrounger.namePL,
            scrounger.description,
            scrounger.quote,
            [PHASE.ACTION],
            ACTION.GATHER,
            2,
            game
        );
        this._character = character;
    }

    use(target: ICharacter | ActionDice | null = null) {
        if (
            !target ||
            (target !== "mystery" && target !== "success" && target !== "hurt")
        ) {
            return;
        }
        if (this._game.actionService.action !== ACTION.GATHER) {
            this._game.alertService.setAlert(
                "Tej umiejętności można użyć tylko na kostkach zbierania"
            );
        }

        if (this._game.actionService.lastRolledItem) {
            this._game.actionService.lastRolledItem.reRollDice(target, ACTION.GATHER);
            this._used = true;
        }
    }
}
